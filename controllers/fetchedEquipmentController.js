const FetchedEquipment = require('../models/fetchedEquipment');

const fetchedEquipmentController = {
  saveFetchedEquipment(req, res) {
    const equipmentData = req.body;

    FetchedEquipment.create(equipmentData)
      .then(savedEquipment => {
        console.log('Equipment saved successfully:', savedEquipment);
        res.status(201).json(savedEquipment);
      })
      .catch(error => {
        console.error('Failed to save equipment:', error);
        res.status(500).json({ error: 'Failed to save equipment' });
      });
  },
};

module.exports = fetchedEquipmentController;
