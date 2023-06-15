const router = require('express').Router();
const fetchedEquipmentController = require('../../controllers/fetchedEquipmentController.js');

router.get('/', fetchedEquipmentController.getFetchedEquipment);
router.post('/', fetchedEquipmentController.saveFetchedEquipment);
router.delete('/:id', fetchedEquipmentController.deleteFetchedEquipment)

module.exports = router;
