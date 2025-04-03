// Importa o módulo Express e cria uma instância do router
const express = require('express');
const router = express.Router();

// Importa o controlador de usuários
const userController = require('../controllers/userController');

/**
 * Rotas de Usuários
 */

// Retorna todos os usuários
router.get('/user/all', userController.getAllUsers);

// Retorna um usuário por ID
router.get('/user/:id', userController.getUserById);

// Cria um novo usuário
router.post('/user', userController.createUser);

// Atualiza um usuário existente
router.put('/user/:id', userController.updateUser);

// Deleta um usuário por ID
router.delete('/user/:id', userController.deleteUser);

// Exporta o router para ser utilizado em outros módulos
module.exports = router;