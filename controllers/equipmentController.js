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
        res.redirect('/equipment');
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to create equipment' });
      });
  },
  
  // Delete an equipment by ID
  deleteEquipment(req, res) {
    const { id } = req.params;
    Equipment.findByIdAndDelete(id)
      .then(deletedEquipment => {
        if (!deletedEquipment) {
          res.status(404).json({ error: 'Equipment not found' });
        } else {
          res.redirect('/equipment');
        }
      })
      .catch(error => {
        console.error('Failed to delete equipment:', error);
        res.status(500).json({ error: 'Failed to delete equipment' });
      });
  },
};

module.exports = equipmentController;
