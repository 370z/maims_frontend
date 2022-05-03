const db = require("../../models");
var omise = require("omise")({
  publicKey: "pkey_test_5m1f223eyg5wo0sxhb8",
  secretKey: "skey_test_5m1f223ez68y15zen7d",
  omiseVersion: "2019-05-29",
});
const { uuid } = require("uuidv4");
const { findOne } = require("../order");
exports.orderTracking = async (req, res) => {
  try {
    let listOrder = await db.CustomerOrder.findAll({
      include: [
        db.CustomerOrderItem,
        db.CustomerDelivery,
        db.CustomerTransaction,
      ],
      where: { CustomerId: req.decoded.iduser },
    });
    let findSellerOrder = listOrder.map((order) => {
      return order.CustomerOrderItems;
    });
    let findSeller = findSellerOrder.map((order) => {
      findOrder = order.map((o) => {
        return o.SellerId;
      });
      return findOrder;
    });

    let findSerialOwn = await db.CustomerOrderItem.findAll({
      include: [db.tbl_userdetail,db.tbl_sellproducts],
      where: {
        SellerId: findSeller,
      },
    });
    if (listOrder.length == 0) {
      return res.status(200).json({
        success: false,
        message: "ยังไม่มีการสั่งซื้อ",
      });
    }
    res.json({
      success: true,
      order: listOrder,
      orderItem: findSerialOwn,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { totalQuantity, totalPrice, deliveryAddress, cart } = req.body;
    const order = await db.CustomerOrder.create({
      totalQuantity: parseInt(totalQuantity),
      totalPrice: parseInt(totalPrice),
      deliveryAddress: parseInt(deliveryAddress),
      CustomerId: req.decoded.iduser,
    });
    const orderNo = await db.CustomerTransaction.create({
      //paymentToken: charge.id,
      orderNo: "IFP" + "_" + uuid().toString().substring(0, 8),
      CustomerOrderId: order.id,
    });
    await cart.forEach(async (product) => {
      quantity = parseInt(product.quantity);
      cartitem = product.id;
      price = parseInt(product.productprice);
      seller = parseInt(product.SellerId);
      let delivery = await db.CustomerDelivery.create({
        deliveryProvider: req.body.deliveryProvider,
        estimatedDelivery: req.body.estimatedDelivery,
        orderStatus: "Pending",
        CustomerOrderId: order.id,
      })
      await db.CustomerOrderItem.create({
        cartItem: cartitem,
        quantity: quantity,
        price: price,
        CustomerOrderId: order.id,
        SellerId: seller,
        ProductId: cartitem,
        DeliveryId: parseInt(deliveryAddress),
        AddressId: parseInt(deliveryAddress)
      });
    })

    res.json({
      success: true,
      message: "Successfully made a order!",
      orderID: orderNo.orderNo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.omisePayment = async (req, res) => {
  try {
    console.log(req.body);
    const { token, totalPrice, email, OrderID } = req.body;
    const customer = await omise.customers.create({
      email: email,
      description: "Credit Card",
      card: token,
    });

    const charge = await omise.charges.create({
      amount: totalPrice * 100,
      currency: "thb",
      customer: customer.id,
    });
    //console.log('from charge',charge)
    let makePayment = await db.CustomerTransaction.findOne({
      where: {
        orderNo: OrderID,
      },
    });
    if (makePayment) {
      await db.CustomerTransaction.update(
        {
          paymentToken: charge.id,
        },
        {
          where: { orderNo: OrderID },
        }
      );
      await db.CustomerDelivery.update(
        {
          orderStatus: "Order",
        },
        {
          where: { CustomerOrderId: makePayment.CustomerOrderId },
        }
      );
    }
    res.json({
      success: true,
      amount: charge.amount,
      status: charge.status,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.omiseIbankingPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { token, totalPrice, email, OrderID } = req.body;
    const customer = await omise.customers.create({
      email: email,
      description: "asas",
      card: token,
    });

    const charge = await omise.charges.create({
      amount: totalPrice * 100,
      currency: "thb",
      customer: customer.id,
    });
    let makePayment = await db.CustomerTransaction.findOne({
      where: {
        orderNo: OrderID,
      },
    });
    if (makePayment) {
      await db.CustomerTransaction.update(
        {
          paymentToken: charge.id,
        },
        {
          where: { orderNo: OrderID },
        }
      );
      await db.CustomerDelivery.update(
        {
          orderStatus: "Order",
        },
        {
          where: { CustomerOrderId: makePayment.CustomerOrderId },
        }
      );
    }
    res.json({
      success: true,
      amount: charge.amount,
      status: charge.status,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.omiseTrueWalletPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { token, totalPrice, email, OrderID } = req.body;
    const charge = await omise.charges.create({
      amount: totalPrice * 100,
      currency: "thb",
      return_uri: "http://maims.cmtc.ac.th",
      source: token,
    });
    let makePayment = await db.CustomerTransaction.findOne({
      where: {
        orderNo: OrderID,
      },
    });
    if (makePayment) {
      await db.CustomerTransaction.update(
        {
          paymentToken: charge.id,
        },
        {
          where: { orderNo: OrderID },
        }
      );
      await db.CustomerDelivery.update(
        {
          orderStatus: "Order",
        },
        {
          where: { CustomerOrderId: makePayment.CustomerOrderId },
        }
      );
    }
    res.json({
      success: true,
      amount: charge.amount,
      status: charge.status,
      authorize_uri: charge.authorize_uri,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
