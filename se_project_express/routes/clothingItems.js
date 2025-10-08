const router = require("express").Router();
const { body, param, validationResult } = require("express-validator");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { BAD_REQUEST } = require("../utils/statusCodes");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ message: "Validation error" });
  }
  return next();
};

router.post(
  "/",
  auth,
  [
    body("name").isLength({ min: 2, max: 30 }),
    body("weather").isIn(["hot", "warm", "cold"]),
    body("imageUrl").isURL(),
    handleValidationErrors,
  ],
  createItem
);

router.get("/", getItems);

router.put(
  "/:itemId/likes",
  auth,
  [param("itemId").isMongoId(), handleValidationErrors],
  likeItem
);

router.delete(
  "/:itemId/likes",
  auth,
  [param("itemId").isMongoId(), handleValidationErrors],
  dislikeItem
);

router.delete(
  "/:itemId",
  auth,
  [param("itemId").isMongoId(), handleValidationErrors],
  deleteItem
);

module.exports = router;
