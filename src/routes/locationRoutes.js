const locationController = require('../controllers/locationController'); 
const express = require('express'); 
const router = express.Router();


router.get('/location', locationController.getAllLocations); 
router.get('/location/:id', locationController.getLocationById);
router.post('/location', locationController.createLocation);
router.put('/location/:id', locationController.updateLocation);
router.delete('/location/:id', locationController.deleteLocation);
module.exports = router;
