const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

const { BAD_REQUEST, NOT_FOUND } = require("../utils/errors");

// Public route
router.post(
  "/signup",
  [
    body("name")
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must be 2–30 characters"),
    body("avatar").isURL().withMessage("Avatar must be a valid URL"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6+ characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json({ message: "Invalid input data" });
    }
    return createUser(req, res, next);
  }
);

// Public route
router.post("/signin", login);

// Public route
router.use("/items", itemRouter);

// Protected route
router.use(auth);

// Protected route
router.use("/users", userRouter);


router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "This page doesn't exist" });
});

module.exports = router;
