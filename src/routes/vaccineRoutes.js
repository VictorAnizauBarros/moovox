const vaccineController = require('../controllers/vaccineController'); 
const express = require('express'); 
const router = express.Router(); 

router.get('/vaccine', vaccineController.getAllVaccines);
router.get('/vaccine/:id', vaccineController.getVaccineById);
router.post('/vaccine', vaccineController.createVaccine);
router.put('/vaccine/:id', vaccineController.updateVaccine);
router.delete('/vaccine/:id', vaccineController.deleteVaccine);
module.exports = router;
