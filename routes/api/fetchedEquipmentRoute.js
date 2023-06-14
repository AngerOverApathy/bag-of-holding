const express = require('express');
const router = express.Router();
const fetchedEquipmentController = require('../../controllers/fetchedEquipmentController.js');

router.post('/', fetchedEquipmentController.saveFetchedEquipment);

module.exports = router;