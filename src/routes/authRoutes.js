const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login
router.get("/login", authController.showLoginPage);
router.post("/login", authController.login);

router.get('/redefinir-senha', authController.showResetPasswordForm);
router.post('/redefinir-senha/:token', authController.resetPassword);

// Recuperar senha
router.get("/recuperar-senha", authController.showRecoverPage);
router.post("/recuperar-senha", authController.recoverPassword);

// (Opcional no futuro) Redefinir senha com token




module.exports = router;
