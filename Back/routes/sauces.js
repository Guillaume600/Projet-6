const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const sauceCtrl = require("../controllers/sauces");
const multer = require("../middleware/multer-config");
const ownerOnly = require("../middleware/owner-only");

router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getSauceById);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, ownerOnly, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, ownerOnly, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;