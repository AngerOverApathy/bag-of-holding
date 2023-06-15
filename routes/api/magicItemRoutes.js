const express = require('express');
const router = express.Router();
const magicItemController = require('../../controllers/magicItemController');

router.post('/', magicItemController.saveMagicItemToDatabase);
router.get('/', magicItemController.getMagicItems);

module.exports = router;
