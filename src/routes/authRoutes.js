const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login
router.get('/', authController.getLogin); 
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

router.get('/redefinir-senha', authController.getResetPasswordForm);
router.post('/redefinir-senha/:token', authController.postResetPassword); 

// Recuperar senha
router.get("/recuperar-senha", authController.getRecoverPassword);
router.post("/recuperar-senha", authController.postRecoverPassword);

// (Opcional no futuro) Redefinir senha com token




module.exports = router;
