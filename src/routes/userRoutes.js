// Importa o módulo Express e cria uma instância do router
const express = require('express');
const router = express.Router();

// Importa o controlador de usuários
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const upload = require("../middlewares/upload");
const ensureAdmin = require('../middlewares/authMiddleware'); 


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

router.get('/dashboard/admin', ensureAdmin, adminController.getAdminDashboard); 
router.get('/admin/users', ensureAdmin, adminController.getUsersDashboard);
router.get('/admin/animals', ensureAdmin, adminController.getAnimalsDashboard);
router.get('/admin/vaccines', ensureAdmin, adminController.getVaccineDashboard); 
router.get('/admin/applications', ensureAdmin, adminController.getApplicationDashboard);
router.get('/admin/profile', ensureAdmin, adminController.getProfileDashboard); 

router.post("/admin/profile/photo", upload.single("profile_photo"), userController.updateProfilePhoto); 
router.put("/admin/profile/:id", userController.updateUserProfile); 


// Exporta o router para ser utilizado em outros módulos
module.exports = router;