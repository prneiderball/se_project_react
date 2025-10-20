const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");
const { NotFoundError } = require("../utils/errors/index");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

router.use("/items", itemRouter);

router.use(auth);

router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("This page doesn't exist"));
});

module.exports = router;
