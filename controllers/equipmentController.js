const Equipment = require('../models/equipmentItems');

const equipmentController = {
  // Render all equipment as a list
  getAllEquipment(req, res) {
    Equipment.find({})
      .then(equipment => {
        res.render('equipmentList', { equipment });
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve equipment' });
      });
  },

  // Create a new equipment
  createEquipment(req, res) {
    Equipment.create(req.body)
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to create equipment' });
      });
  },
};

module.exports = equipmentController;
