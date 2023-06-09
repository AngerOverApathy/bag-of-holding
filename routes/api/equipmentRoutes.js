const router = require('express').Router();
const equipmentController = require('../../controllers/equipmentController.js');

router.get('/', equipmentController.getAllEquipment);
router.post('/', equipmentController.createEquipment);
// router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
