const express = require("express");
const db = require("../models");

exports.findAll = (req, res) => {
  db.tbl_order
    .findAll({
      where: {
        serial_number: req.user.Serial,
      },
    })
    .then((data) => {
      res.status(200).json({
        statusCode: 200,
        message: "Data in Found",
        data: data,
      });
    });
};

exports.findOne = (req, res) => {
  db.tbl_order.findByPk(req.params.id).then((data) => {
    res.status(200).json({
      statusCode: 200,
      message: "Data in Found",
      data: data,
    });
  });
};

exports.changestatus = (req, res) => {
  db.tbl_order
    .update(
      {
        status_order: "Delivery",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((data) => {
      res.status(200).json({
        statusCode: 201,
        message: "Status Update Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.ShowDeliveryAddress = async (req, res) => {
  try {
    const findAddress = await db.CustomerAddress.findOne({
      include: [db.Customer.scope("withoutPassword")],
      where: {
        id: req.params.addressId,
      },
    });
    if (findAddress) {
      res.json({
        success: true,
        deliveryAddress: findAddress,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.ShowOrder = async (req, res) => {
  // console.log(req.user);
  try {
    const findUser = await db.User.scope("withoutPassword").findOne({
      include: [db.tbl_userdetail, db.tbl_userserial],
      where: {
        id: req.decoded.iduser,
      },
    });
    const findSeller = await findUser.tbl_userdetail;
    console.log(findSeller);
    const findOrderItem = await db.CustomerOrderItem.findAll({
      include: [db.tbl_sellproducts,db.CustomerDelivery,db.CustomerAddress,db.CustomerOrder],
      where: {
        SellerId: req.decoded.iduser
      },
    });
    const findTransaction = findOrderItem.map((order) => {
      return order.CustomerOrderId;
    });
   
    const foundTransaction = await db.CustomerTransaction.findAll({
      where:{
        CustomerOrderId: findTransaction
      }
    })
    if (!findOrderItem.length) {
      return res.status(200).json({
        success: false,
        message: "ยังไม่มีการสั่งซื้อ",
      });
    }
    res.json({
      success: true,
      order: findOrderItem,
      transaction:foundTransaction
     
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// exports.findstatus = (req, res) => {
//     const staus = req.params.id;
//     const sql =  `select * form tbl_order where ${staus}`;
//     sequelize.query(sql, async(err, res) => {
//         if(err){
//             console.log("error");
//         }else{
//             console.log(res);
//         }
//     });
// }
