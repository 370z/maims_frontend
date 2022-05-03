const db = require("../../models");
const {
  hashPassword,
  sendTokenResponse,
  matchPassword,
} = require("../../utils/authCustomer");
const {
  customerRegisterValidation,
  customerLoginValidation,
  customerChangePasswordValidation,
  customerProfileValidation,
} = require("../../utils/validation");
const { uuid } = require("uuidv4");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.login = async (req, res) => {
  const { error } = customerLoginValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  const emailExist = await db.Customer.findOne({
    where: { email: req.body.email },
  });
  if (!emailExist)
    return res
      .status(400)
      .json({ success: false, message: "ไม่มี Email นี้อยู่ในระบบ" });
  //password is correct ??
  const validPass = await matchPassword(req.body.password, emailExist.password);
  if (!validPass || !req.body.password)
    return res
      .status(400)
      .json({ success: false, message: "รหัสผ่านไม่ถูกต้อง" });

  sendTokenResponse(emailExist.id, 200, res);
};

exports.me = async (req, res) => {
  try {
    let foundUser = await db.Customer.scope("withoutPassword").findOne({
      include: [db.CustomerProfile, db.CustomerOrder, db.CustomerAddress],
      where: { id: req.decoded.iduser },
    });
    //console.log("found", foundUser);
    if (foundUser) {
      let findProfile = await db.CustomerProfile.findOne({
        where: {
          CustomerId: req.decoded.iduser,
        },
      });
      if (!findProfile) {
        let createNewProfile = await db.CustomerProfile.create({
          displayName: foundUser.userName,
          fullName: null,
          phoneNumber: null,
          sex: null,
          CustomerId: req.decoded.iduser,
        });
      }

      res.json({
        success: true,
        message: "Successfully login",
        users: foundUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.editProfile = async (req, res) => {
  const { error } = customerProfileValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    let foundUser = await db.Customer.findOne({
      where: {
        id: req.decoded.iduser,
      },
    });
    if (foundUser) {
      let foundProfile = await db.CustomerProfile.findOne({
        where: { CustomerId: req.decoded.iduser },
      });
      if (foundProfile) {
        console.log(foundProfile)
        await db.CustomerProfile.update(
          {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            sex: req.body.sex,
          },
          {
            where: {
              CustomerId: req.decoded.iduser,
            },
          }
        );
      }
    }

    return res.json({
      success: true,
      message: "แก้ไขโปรไฟล์สำเร็จ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.create = async (req, res) => {
  const { error } = customerRegisterValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  const usernameExist = await db.Customer.findOne({
    where: { userName: req.body.userName },
  });
  if (usernameExist)
    return res
      .status(400)
      .json({ success: false, message: "Username นี้มีผู้ใช้อยู่แล้ว" });
  console.log(usernameExist);
  const emailExist = await db.Customer.findOne({
    where: { email: req.body.email },
  });
  if (emailExist)
    return res
      .status(400)
      .json({ success: false, message: "Email นี้มีผู้ใช้อยู่แล้ว" });
  try {
    let password = req.body.password;
    password = await hashPassword(password);

    const CreatedCustomer = await db.Customer.create({
      userName: req.body.userName,
      password: password,
      email: req.body.email,
      status_level: "member",
    });
    return res.json({ success: true, message: "Register Successfully !" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  const { error } = customerChangePasswordValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    let password = req.body.password;
    password = await hashPassword(password);
    const UpdateUser = await db.Customer.update(
      {
        password: password,
      },
      {
        where: {
          id: req.decoded.iduser,
        },
      }
    );
    if (UpdateUser) {
      res.json({
        success: true,
        message: "อัพเดทรหัสผ่านใหม่เรียบร้อยแล้ว",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.estimated = async (req, res) => {
  const SHIPMENT = {
    normal: {
      name: "EMS",
      price: 25,
      days: 5,
    },
    express: {
      name: "Kerry Express",
      price: 40,
      days: 3,
    },
  };
  function shipmentPrice(shipmentOption) {
    let estimated = moment()
      .add(shipmentOption.days, "d")
      .format("dddd MMMM Do");
    return {
      name: shipmentOption.name,
      estimated,
      price: shipmentOption.price,
    };
  }
  let shipment;
  if (req.body.shipment === "normal") {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.express);
  }

  res.json({
    success: true,
    shipment: shipment,
  });
};

exports.payment = (req, res) => {
  if (req.body.token.error) {
    return res.status(500).json({
      success: false,
      message: "ไม่พบข้อมูลบัตรเครดิต กรุณาทำรายการใหม่อีกครั้ง",
    });
  }
  let totalPrice = Math.round(req.body.totalPrice * 100);
  stripe.customers
    .create({
      email: req.body.email,
    })
    .then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa",
      });
    })
    .then((source) => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: "thb",
        customer: source.customer,
      });
    })
    .then(async (charge) => {
      //console.log('from charge',charge)
      const order = await db.CustomerOrder.create({
        totalQuantity: parseInt(req.body.totalQuantity),
        totalPrice: parseInt(req.body.totalPrice),
        deliveryAddress: parseInt(req.body.deliveryAddress),
        CustomerId: req.decoded.iduser,
      });
      const orderNo = await db.CustomerTransaction.create({
        paymentToken: charge.id,
        orderNo: "IFP" + "_" + uuid().toString().substring(0, 8),
        CustomerOrderId: order.id,
      });
      console.log(order);
      let cart = req.body.cart;
      cart.forEach((product) => {
        quantity = parseInt(product.quantity);
        cartitem = product.id;
        price = parseInt(product.productprice);
        db.CustomerOrderItem.create({
          cartItem: cartitem,
          quantity: quantity,
          price: price,
          CustomerOrderId: order.id,
          ProductId: cartitem,
        });
      });
      let delivery = db.CustomerDelivery.create({
        deliveryProvider: req.body.deliveryProvider,
        estimatedDelivery: req.body.estimatedDelivery,
        orderStatus: "Order",
        CustomerOrderId: order.id,
      });
    })
    .then(async (charge) => {
      //order.owner = req.decoded.iduser;
      //order.estimatedDelivery = req.body.estimatedDelivery;
      // await order.save();
      res.json({
        success: true,
        message: "Successfully made a payment",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
