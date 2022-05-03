const db = require("../models");

exports.findOne = (req, res) => {
    // console.log(req.body);
    db.tbl_settingpump.findOne({
        include: [db.tbl_userserial],
        where: {
            serial_id: req.body.serial
        }
    })
        .then((data) => {
            res.status(200).json({
                statusCode: 200,
                message: "Data in Found",
                data: data
            })
        })
};

exports.update = async (req, res) => {
    try {
        let updateSetting = await db.tbl_settingpump.update({
            temp: parseFloat(req.body.temp),
            humi: parseInt(req.body.humi),
            ec: parseFloat(req.body.ec),
            water_level: parseFloat(req.body.water_level),
            pump_a: (req.body.pump_a),
            pump_b: (req.body.pump_b),
            pump_c: (req.body.pump_c),
            pump_d: (req.body.pump_d)
        },
            {
                where: {
                    serial_id: parseInt(req.body.serial_id)
                }
            })
            console.log(updateSetting)
        if (updateSetting) {
            console.log('successfully')
            res.status(200).json({
                data: updateSetting,
            });
        }

    }
    catch (err) {

    }
};