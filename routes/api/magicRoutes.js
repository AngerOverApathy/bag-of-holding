const express = require('express');
const router = express.Router();
const magicItemController = require('../../controllers/magicItemController');

router.get('/', magicItemController.getAllMagicItems);
router.post('/', magicItemController.createMagicItem);
router.put('/:id', magicItemController.updateMagicItem);
router.delete('/:id', magicItemController.deleteMagicItem);

module.exports = router;
