// Importa o módulo Express e cria uma instância do router
const express = require('express');
const router = express.Router();

// Importa o controlador de animais
const animalController = require('../controllers/animalController');

/**
 * Definição das rotas para gerenciamento de animais
 */

// Rota para obter todos os animais
router.get('/animal', animalController.getAllAnimals);

// Rota para obter um animal por ID
router.get('/animal/:id', animalController.getAnimalById);

// Rota para criar um novo animal
router.post('/animal', animalController.createAnimal);

// Rota para atualizar um animal existente
router.put('/animal/:id', animalController.updateAnimal);

// Rota para excluir um animal por ID
router.delete('/animal/:id', animalController.deleteAnimal);

// Exporta o router para ser utilizado em outros módulos
module.exports = router;