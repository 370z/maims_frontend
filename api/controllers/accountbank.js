
const express = require("express");
const db = require("../models");
const {hashPassword, matchPassword} = require("../utils/auth");


exports.addaccountbank = async(req, res) => {
    let {namebank,nameaccountTH,nameaccountEN,numberaccount} = req.body;
    //อนาคตเช็คบัญชีว่าบัญชีมีจริงหรือไม่
    db.tbl_useraccountbank.create({
        namebank : namebank,
        nameaccountTH : nameaccountTH,
        nameaccountEN : nameaccountEN,
        numberaccount : numberaccount,
        UserId: req.user.id
    })
    .then((data ) =>{
        res.status(200).json({
            statusCode: 201,
            message: "User Created Successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    });

}

exports.editaccountbank = async(req, res) => {
    let {namebank,nameaccountTH,nameaccountEN,numberaccount,id} = req.body;
    //อนาคตเช็คบัญชีว่าบัญชีมีจริงหรือไม่

    db.tbl_useraccountbank.update({
        namebank : namebank,
        nameaccountTH : nameaccountTH,
        nameaccountEN : nameaccountEN,
        numberaccount : numberaccount,
        UserId: req.user.id
    },
    {
        where:{
            id: id,
        }
    }
    )
    .then((data ) =>{
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

exports.delaccountbank = async(req, res) => {
    await db.tbl_useraccountbank.destroy({
        where:{
            id: req.params.id
        }
    }).then(data => {
        res.status(200).json({
            statusCode: 204,
            message: "ลบข้อมูลSerialสำเร็จ",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send(err);
    })
}