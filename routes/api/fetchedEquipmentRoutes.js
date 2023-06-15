const router = require('express').Router();
const fetchedEquipmentController = require('../../controllers/fetchedEquipmentController.js');

router.get('/', fetchedEquipmentController.getFetchedEquipment);
router.post('/', fetchedEquipmentController.saveFetchedEquipment);

module.exports = router;
