const router = require("express").Router();
const { body, param, validationResult } = require("express-validator");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { BAD_REQUEST } = require("../utils/errors");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ message: "Validation error" });
  }
  return next();
};

router.post(
  "/",
  [
    body("name")
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must be 2–30 characters long"),
    body("weather")
      .isIn(["hot", "warm", "cold"])
      .withMessage("Weather must be one of: hot, warm, cold"),
    body("imageUrl").isURL().withMessage("imageUrl must be a valid URL"),
    handleValidationErrors,
  ],
  createItem
);

router.get("/", getItems);

router.put(
  "/:itemId/likes",
  [
    param("itemId").isMongoId().withMessage("Invalid item ID"),
    handleValidationErrors,
  ],
  likeItem
);

router.delete(
  "/:itemId/likes",
  [
    param("itemId").isMongoId().withMessage("Invalid item ID"),
    handleValidationErrors,
  ],
  dislikeItem
);

router.delete(
  "/:itemId",
  [
    param("itemId").isMongoId().withMessage("Invalid item ID"),
    handleValidationErrors,
  ],
  deleteItem
);

module.exports = router;
