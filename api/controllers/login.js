const db = require("../models");
const {
    hashPassword,
    sendTokenResponse,
    matchPassword,
} = require("../utils/auth");
const { RegisterValidation, LoginValidation } = require("../utils/validation");

exports.login = async(req, res) => {
    let { username, password } = req.body;
    const { error } = LoginValidation({ username, password });
    if (error)
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    //เช็คว่ามี user รึเปล่า
    const userExist = await db.User.findOne({
        where: { userName: username },
    });
    if (!userExist)
        return res
            .status(400)
            .json({ success: false, message: "ไม่มี User นี้อยู่ในระบบ" });
    //เช็ครหัสผ่านว่าถูกมั้ย ??
    const validPass = await matchPassword(password, userExist.password);
    if (!validPass || !password)
        return res
            .status(400)
            .json({ success: false, message: "รหัสผ่านไม่ถูกต้อง" });

    await sendTokenResponse(userExist.id, 200, res);
};

exports.sing = async(req, res) => {
    let { username, password, serial } = req.body;
    const { error } = RegisterValidation({ username, password, serial });
    if (error)
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    const usernameExist = await db.User.findOne({
        where: { userName: username },
    });
    if (usernameExist)
        return res
            .status(400)
            .json({ success: false, message: "Username นี้มีผู้ใช้อยู่แล้ว" });
    const serialExist = await db.tbl_Serial.findOne({
        where: { serial: serial }
    });

    if (!serialExist) {
        return res
            .status(400)
            .json({ success: false, message: "ไม่มี Serial นี้ในระบบ" });
    }
    const serialCheck = await db.tbl_userserial.findOne({
        where: { Serial: serialExist.serial },
    });
    if (serialCheck) {
        return res
            .status(400)
            .json({ success: false, message: "Serial นี้ได้ถูกลงทะเบียนแล้ว" });
    }
    //หากไม่ติดเงื่อนไขใด ๆ จะทำการสมัครสมาชิกโดยใช้ serial ที่ใส่เข้ามา
    try {
        password = await hashPassword(password);
        const CreateUser = await db.User.create({
            userName: username,
            password: password,
        });
        const CreateDetailUser = await db.tbl_userdetail.create({
            name: username,
            email: '',
            address: '',
            detail: '',
            img: 'Default.png',
            status_level: 'members',
            UserId: CreateUser.id
        });
        const AddSerialUser = await db.tbl_userserial.create({
            name: 'กรุณาเปลี่ยนชื่อ',
            serial: serial,
            UserId: CreateUser.id
        })
        const Adddashbord = await db.tbl_dbRealtime.create({
            serial_id: AddSerialUser.id,
            user_id: AddSerialUser.UserId,
            temp: 0,
            humi: 0,
            light_int: 0,
            ec: 0,
            ph: 0,
            water_level: 0,
            pump_a: 0,
            pump_b: 0,
            pump_c: 0,
            pump_d: 0
        })
        const settingsystem = await db.tbl_settingpump.create({
            serial_id: AddSerialUser.id,
            user_id: AddSerialUser.UserId,
            temp: 0,
            humi: 0,
            ec: 0,
            ph: 0,
            water_level: 0,
            pump_a: 0,
            pump_b: 0,
            pump_c: 0,
            pump_d: 0
        })
        const updataserial = await db.tbl_Serial.update({
            status: 1
        }, {
            where: {
                serial: serial
            }
        })
        await sendTokenResponse(CreateUser.id, 200, res);
        //return res.json({ success: true, message: "สมัครสมาชิกสำเร็จ" });
    } catch (err) {
        res.status(500).send(err);
    }
};