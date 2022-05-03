const express = require('express')
const router = express.Router();
const loginController = require("../controllers/login");

router.post("/", loginController.login);
router.post("/res", loginController.sing);
// router.get("/:id", loginController.findOne);
// router.get("/:id", loginController.findOne);
// router.get("/status/:id", loginController.findstatus);
// router.delete("/img/:id", login.deleteimg);
// router.post("/", login.create);

// router.put("/:id", login.update);

// router.delete("/", login.deleteAll);
// router.delete("/:id", login.deleteOne);

module.exports = router;