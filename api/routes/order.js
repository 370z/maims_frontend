const express = require('express')
const router = express.Router();
const OrderController = require("../controllers/order");
const { protect } = require("../utils/auth");
router.use(protect);
router.get("/deliveryaddress/:addressId", OrderController.ShowDeliveryAddress);
router.get("/showorder", OrderController.ShowOrder);
router.get("/", OrderController.findAll);
router.get("/:id", OrderController.findOne);
router.put("/:id", OrderController.changestatus);

module.exports = router;