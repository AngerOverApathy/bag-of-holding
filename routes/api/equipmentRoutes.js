const router = require('express').Router();
const equipmentController = require('../../controllers/equipmentController.js');

router.get('/', equipmentController.getAllEquipment);
router.post('/', equipmentController.createEquipment);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
