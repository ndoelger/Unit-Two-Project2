const express = require("express");
const router = express.Router();
const petsCtrl = require("../controllers/pets");

router.get("/", petsCtrl.index);
router.get("/new", petsCtrl.new)
router.get("/:id", petsCtrl.show)
router.get("/:id/edit", petsCtrl.edit)
router.post("/", petsCtrl.create)
router.put("/:id", petsCtrl.update)
router.delete("/:id", petsCtrl.delete)

module.exports = router;
