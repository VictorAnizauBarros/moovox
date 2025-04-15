// Importa o módulo Express e cria uma instância do router
const express = require('express');
const router = express.Router();

// Importa o controlador de usuários
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController'); 


/**
 * Rotas de Usuários
 */

// Retorna todos os usuários
router.get('/user', userController.getAllUsers);

// Retorna um usuário por ID
router.get('/user/:id', userController.getUserById);

// Cria um novo usuário
router.post('/user', userController.createUser);

// Atualiza um usuário existente
router.put('/user/:id', userController.updateUser);

// Deleta um usuário por ID
router.delete('/user/:id', userController.deleteUser);

router.get('/dashboard/admin', adminController.getAdminDashboard); 
router.get('/admin/users', adminController.getUsersDashboard);



// Exporta o router para ser utilizado em outros módulos
module.exports = router;