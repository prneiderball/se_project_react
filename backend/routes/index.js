const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { BAD_REQUEST, NOT_FOUND } = require("../utils/errors");

router.post(
  "/signup",
  [
    body("name").isLength({ min: 2, max: 30 }),
    body("avatar").isURL(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(BAD_REQUEST).json({ message: "Invalid input data" });
    return createUser(req, res, next);
  }
);

router.post("/signin", login);

router.use(auth);
router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => res.status(NOT_FOUND).json({ message: "This page doesn't exist" }));

module.exports = router;
