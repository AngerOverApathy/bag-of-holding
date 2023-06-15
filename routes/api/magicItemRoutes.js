const router = require('express').Router();
const magicItemController = require('../../controllers/magicItemController.js');

router.get('/', magicItemController.getMagicItems);
router.post('/', magicItemController.saveMagicItemToDatabase);

module.exports = router;
