const express = require('express')
const router = express.Router();
const UserController = require("../controllers/sellproducts");
const { protect } = require("../utils/auth");

router.get("/show", UserController.showproduct);
router.put("/img/:id", UserController.img);
router.use(protect);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findOne);
router.delete("/img/:id", UserController.deleteimg);
router.post("/", UserController.create);

router.put("/:id", UserController.update);
router.put("/statusproduct/:id", UserController.updatestatus);

router.delete("/", UserController.deleteAll);
router.delete("/:id", UserController.deleteOne);

module.exports = router;