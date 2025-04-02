const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware").authenticate; // ✅ 미들웨어 추가

// 회원 API
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// ✅ 로그인된 사용자만 접근 가능
router.get("/me", authenticate, authController.getUserProfile);
router.put("/update", authenticate, authController.updateUser);
router.delete("/delete", authenticate, authController.deleteUser);

module.exports = router;
