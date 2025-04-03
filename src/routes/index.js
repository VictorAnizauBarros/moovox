const express = require('express');

const userRoutes = require('./userRoutes');
const animalRoutes = require('./animalRoutes');

const router = express.Router();

router.use(userRoutes); 
router.use(animalRoutes);


module.exports = router; 