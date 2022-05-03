const db = require("../models");

// exports.findAll = (req, res) => {
//     let{ serial } = req.body
//     db.tbl_dbList.findAll({
//         where:{
//             serial_number: serial
//         }
//     })
//     .then((data) => {
//         console.log(data);
//         res.status(200).json({
//             statusCode: 200,
//             message: "Data in Found",
//             data:data

//         })
//     })
//     .catch((err) => {
//         res.status(500).send(err);
//     })
// }

exports.findOne = (req, res) => {
    // console.log(req.body);
    db.tbl_dbList.findAll({
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