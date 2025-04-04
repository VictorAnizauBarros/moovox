const express = require('express');

const userRoutes = require('./userRoutes');
const animalRoutes = require('./animalRoutes');
const vaccineRoutes = require('./vaccineRoutes'); 
const telemetryRoutes = require('./telemetryRoutes');
const locationRoutes = require('./locationRoutes') 

const router = express.Router();

router.use(userRoutes); 
router.use(animalRoutes);
router.use(vaccineRoutes);
router.use(telemetryRoutes);
router.use(locationRoutes);


module.exports = router; 