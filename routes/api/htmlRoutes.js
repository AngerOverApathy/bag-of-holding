const path = require('path');
const router = require('express').Router();
const Equipment = require('../../models/equipmentItems');

router.get('/', async (req, res) => {
  try {
    const equipment = await Equipment.find({});
    res.render('equipmentList', { equipment, fetchedEquipment, magicItems, fetchedEquipmentData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve equipment' });
  }
});

router.get('/js/formHandling.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/js/formHandling.js'));
});

router.get('/css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/style.css'));
});

module.exports = router;
