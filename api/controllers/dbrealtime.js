const db = require("../models");

exports.findOne = (req, res) => {
    // console.log(req.body);
    db.tbl_dbRealtime.findOne({
        include:[db.tbl_userserial],
        where:{
            serial_id: req.body.serial
        }
    })
    .then((data) => {
        res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data:data
        })
    })
};