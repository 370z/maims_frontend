const express = require('express')
const router = express.Router();
const settingpumpController = require("../controllers/settingpump");
const { protect } = require("../utils/auth");

router.use(protect); 
// router.post("/", settingpumpController.create);
router.post("/", settingpumpController.findOne);
// router.get("/status/:id", dblistController.findstatus);
// router.delete("/img/:id", dblist.deleteimg);
// router.post("/", dblist.create);

router.put("/", settingpumpController.update);

// router.delete("/", dblist.deleteAll);
// router.delete("/:id", dblist.deleteOne);

module.exports = router;