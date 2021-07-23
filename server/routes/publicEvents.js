const express = require("express");
const router = express.Router();

const {
  createPublicEvent,
  findPublicEvenByComb,
  findPublicEvenById,
  addPublicEvent,
  deletePublicEvent,
} = require("../controllers/publicEvent");
const {
  validatePublicEvent,
  validateCombination,
  validateCombPatch,
} = require("../middleware/validatePublicEvent");

router.route("/").post(validatePublicEvent, createPublicEvent);
router.route("/").get(validateCombination, findPublicEvenByComb);
router.route("/:id").get(findPublicEvenById);
router.route("/").patch(validateCombPatch, addPublicEvent);
router.route("/").delete(validateCombPatch, deletePublicEvent);

module.exports = router;
