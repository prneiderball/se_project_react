const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

router.post("/", auth, validateCardBody, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", auth, validateItemId, likeItem);

router.delete("/:itemId/likes", auth, validateItemId, dislikeItem);

router.delete("/:itemId", auth, validateItemId, deleteItem);

module.exports = router;
