const express = require("express");
const db = require("../models");
const { hashPassword, matchPassword } = require("../utils/auth");
const { RegisterValidation, LoginValidation } = require("../utils/validation");
exports.findAll = (req, res) => {
    db.User.findAll({
            include: [db.tbl_userdetail]
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 200,
                message: "Data in Found",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};
exports.userone = async(req, res) => {
    await db.User.scope("withoutPassword").findOne({
            include: [db.tbl_userdetail, db.tbl_userserial, db.tbl_useraccountbank],
            where: { id: req.user.id },
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 200,
                data: data
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.create = async(req, res) => {
    let { userName, password, serial_number, status_level } = req.body;
    const usernameExist = await db.User.findOne({
        where: { userName: userName },
    });
    if (usernameExist)
        return res
            .status(400)
            .json({ success: false, message: "Username นี้มีผู้ใช้อยู่แล้ว" });
    const serialExist = await db.tbl_Serial.findOne({
        where: { serial: serial_number }
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
            userName: userName,
            password: password,
        });
        const CreateDetailUser = await db.tbl_userdetail.create({
            name: userName,
            email: '',
            address: '',
            detail: '',
            img: 'Default.png',
            status_level: status_level,
            UserId: CreateUser.id
        });
        const AddSerialUser = await db.tbl_userserial.create({
            name: 'กรุณาเปลี่ยนชื่อ',
            serial: serial_number,
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
                serial: serial_number
            }
        })
        res.status(200).json({
            statusCode: 201,
            data: CreateDetailUser,
            message: "User Update Successfully",
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.update = (req, res) => {
    let { name, email, address, detail, id } = req.body;
    db.tbl_userdetail.update({
            name: name,
            email: email,
            address: address,
            detail: detail,
        }, {
            where: {
                id: id,
            },
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 201,
                message: "User Update Successfully",
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.changepassword = async(req, res) => {
    let { password, newpassword, confirmpassword } = req.body;
    let datauser = await db.User.findOne({
        where: {
            id: "1"
        }
    })
    const validPass = await matchPassword(password, datauser.password);
    console.log(validPass);
    if (!validPass) {
        return res.status(400).json({
            success: false,
            message: "รห้สผ่านเดิมไม่ถูกต้อง"
        });
    }
    let Newpassword = await hashPassword(newpassword);
    db.User.update({
            password: Newpassword
        }, {
            where: {
                id: req.user.id
            }
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 200,
                message: "ทำการเปลี่ยนรห้สผ่านสำเร็จ"
            })
        })

}

exports.deleteOne = (req, res) => {
    db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.status(200).json({
                statusCode: 204,
                message: "User Deleted Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.deleteAll = (req, res) => {
    db.User.destroy({ where: {} })
        .then((data) => {
            res.status(200).json({
                statusCode: 204,
                message: "User Deleted All Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.img = async(req, res, ) => {
    if (!req.files) {
        res.status(400).json({
            statusCode: 400,
            message: "No files sent"
        })
    }
    const file = req.files.files;
    console.log(file);
    file.name = `profile_${req.params.id}${
        path.parse(file.name).ext
    }`;
    console.log(file);
    file.mv(`${process.env.FILE_UPLOAD_PATH}/profile/${file.name}`, async(err) => {
        if (err) {
            res.status(400).json({
                statusCode: 400,
                message: "Copying images to the server failed."
            })
        }
        try {
            db.tbl_sellproducts.update({
                productimg: file.name
            }, {
                where: {
                    id: req.params.id
                }
            }).then(data => {
                return res.status(200).json({
                    statusCode: 201,
                    message: 'Update Img Successfully',
                    data: data,
                    namefile: file.name
                })
            });
        } catch (err) {
            res.status(400).json({
                statusCode: 400,
                message: "Failed to save the image."
            })
        }
    });
}