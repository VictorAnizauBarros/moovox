const applicationController = require('../controllers/applicationController'); 
const express = require('express'); 
const router = express.Router();

router.get('/application', applicationController.getAllApplications); 
router.get('/application/:id', applicationController.getApplicationById);
router.post('/application', applicationController.createApplication);
router.put('/application/:id', applicationController.updateApplication);
router.delete('/application/:id', applicationController.deleteApplication);

module.exports = router; 