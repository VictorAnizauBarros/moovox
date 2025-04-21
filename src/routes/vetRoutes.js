const vetController = require('../controllers/vetController'); 
const express = require('express'); 
const router = express.Router();

router.get("/veterinario", vetController.getAllVets); 

module.exports = router; 