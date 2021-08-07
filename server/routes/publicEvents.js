const express = require("express");
const router = express.Router();

const {
  createPublicEvent,
  findPublicEventByComb,
  findPublicEventById,
  addPublicEvent,
  deletePublicEvent,
} = require("../controllers/publicEvent");
const {
  validatePublicEvent,
  validateCombination,
  validateCombPatch,
  validateCombDel,
} = require("../middleware/validatePublicEvent");

router.route("/").post(validatePublicEvent, createPublicEvent);
router.route("/").get(validateCombination, findPublicEventByComb);
router.route("/:id").get(findPublicEventById);
router.route("/").patch(validateCombPatch, addPublicEvent);
router.route("/").delete(validateCombDel, deletePublicEvent);

module.exports = router;
