// Importa o módulo Express e cria uma instância do router
const express = require("express");
const router = express.Router();

// Importa o controlador de usuários
const userController = require("../controllers/userController");

/**
 * Rotas de Usuários
 */

// Retorna todos os usuários
router.get("/user", userController.getAllUsers);

// Retorna um usuário por ID
router.get("/user/:id", userController.getUserById);

// Cria um novo usuário
router.post("/user", userController.createUser);

// Atualiza um usuário existente
router.put("/user/:id", userController.updateUser);

// Deleta um usuário por ID
router.delete("/user/:id", userController.deleteUser);

// Realiza login de um usuário
router.post("/user/login", userController.loginUser);

// Valida se o usuário existe por ID
router.get("/user/validate/:id", userController.validateUser);

// Exporta o router para ser utilizado em outros módulos
module.exports = router;
