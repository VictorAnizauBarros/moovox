const telemetryController = require('../controllers/telemetryController'); 
const express = require('express'); 
const router = express.Router();

router.get('/telemetry', telemetryController.getAllTelemetrys); 
router.get('/telemetry/:id', telemetryController.getTelemetryById);
router.post('/telemetry', telemetryController.createTelemetry);
router.put('/telemetry/:id', telemetryController.updateTelemetry);
router.delete('/telemetry/:id', telemetryController.deleteTelemetry);
module.exports = router;
