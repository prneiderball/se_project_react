const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");

// Protected route to get the current authenticated user's profile
router.get("/me", getCurrentUser);

// Protected route to update the current user's name and avatar
router.patch("/me", updateUserProfile);

module.exports = router;
