const express = require("express");
const db = require("../models");
const { uuid } = require("uuidv4");
const { hashPassword, matchPassword } = require("../utils/auth");


exports.addserial = async(req, res) => {
    let { name, serial } = req.body;
    let checkserialsystem = await db.tbl_Serial.findOne({
        where: {
            serial: serial
        }
    })

    if (!checkserialsystem) {
        return res.status(400).json({
            statusCode: 400,
            message: "ไม่มีSerialนี้ในระบบ"
        })
    }

    let checkserial = await db.tbl_userserial.findOne({
        where: {
            serial: serial
        }
    })

    if (checkserial) {
        return res.status(400).json({
            statusCode: 400,
            message: "Serialนี้ถูกใช้ไปแล้ว"
        })
    }

    const updataserial = await db.tbl_Serial.update({
        status: 1
    }, {
        where: {
            serial: serial
        }
    })

    let createserial = await db.tbl_userserial.create({
        name: name,
        serial: serial,
        UserId: req.user.id
    })

    const Adddashbord = await db.tbl_dbRealtime.create({
        serial_id: createserial.id,
        user_id: createserial.UserId,
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
        serial_id: createserial.id,
        user_id: createserial.UserId,
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

    res.status(200).json({
        statusCode: 201,
        message: "User Created Successfully",
        data: createserial
    });
}

exports.editserial = async(req, res) => {
    console.log(req.body);
    let { name, id } = req.body;

    db.tbl_userserial.update({
            name: name,
            UserId: req.user.id
        }, {
            where: {
                id: id,
            }
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 201,
                message: "User Update Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

exports.delserial = async(req, res) => {
    await db.tbl_settingpump.destroy({
        include: [db.tbl_userserial],
        where: {
            serial_id: req.params.id
        }
    })
    await db.tbl_dbRealtime.destroy({
        include: [db.tbl_userserial],
        where: {
            serial_id: req.params.id
        }
    })
    let delserial = await db.tbl_userserial.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        statusCode: 204,
        message: "ลบ Serial สำเร็จ",
        data: delserial,
    });
}

exports.createserial = async(req, res) => {
    let { title, count } = req.body;
    let alldata = [];

    for (let index = 1; index <= count; index++) {
        let serial = title + "_" + uuid().toString().substring(0, 8)
        let checkserial = await db.tbl_Serial.findOne({
            where: {
                serial: serial
            }
        })
        if (checkserial) {
            count - 1;
        } else {
            let data = await db.tbl_Serial.create({
                serial: serial,
                status: 0
            })
            alldata.push(data);
        }

    }
    res.status(200).json({
        statusCode: 201,
        message: "User create Serail Successfully",
        data: alldata
    });

}

exports.adminshow = async(req, res) => {
    await db.tbl_Serial.findAll()
        .then(data => {
            res.status(200).json({
                statusCode: 204,
                message: "ไม่มีSerialอยู่ในระบบ",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}