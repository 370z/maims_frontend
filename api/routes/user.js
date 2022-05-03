const express = require('express')
const router = express.Router();
const UserController = require("../controllers/user");
const UserserialController = require("../controllers/serial");
const UseraccountbankController = require("../controllers/accountbank");
const { protect } = require("../utils/auth");

router.use(protect);
router.get("/", UserController.findAll);
router.get("/userone", UserController.userone);
router.post("/", UserController.create);
router.put("/profile", UserController.update);
router.put("/changepassword", UserController.changepassword);
router.delete("/", UserController.deleteAll);
router.delete("/:id", UserController.deleteOne);
// router.put("/:id", UserController.img);

router.post("/serial", UserserialController.addserial);
router.put("/serial", UserserialController.editserial);
router.delete("/serial/:id", UserserialController.delserial);

router.post("/accountbank", UseraccountbankController.addaccountbank);
router.put("/accountbank", UseraccountbankController.editaccountbank);
router.delete("/accountbank/:id", UseraccountbankController.delaccountbank);

router.post("/admin/addserial", UserserialController.createserial);
router.get("/admin/serialshow", UserserialController.adminshow);

module.exports = router;