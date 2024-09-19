const express = require("express");
const {
  userRegisterController,
  userLoginController,
} = require("../controller/userController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userRegisterController);

router.post("/login", userLoginController);

// auth route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
