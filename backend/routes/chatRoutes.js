const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authmiddleware");
const { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatController");

router.route("/").post(protect,accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupaddd").put(protect, addToGroup);

module.exports = router;