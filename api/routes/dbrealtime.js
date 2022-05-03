const express = require('express')
const router = express.Router();
const dbrealtimeController = require("../controllers/dbrealtime");
const { protect } = require("../utils/auth");

router.use(protect);
router.post("/", dbrealtimeController.findOne);
// router.post("/", dbrealtimeController.dbrealtime);
// router.get("/status/:id", dbrealtimeController.findstatus);
// router.delete("/img/:id", dbrealtime.deleteimg);
// router.post("/", dbrealtime.create);

// router.put("/:id", dbrealtime.update);

// router.delete("/", dbrealtime.deleteAll);
// router.delete("/:id", dbrealtime.deleteOne);

module.exports = router;