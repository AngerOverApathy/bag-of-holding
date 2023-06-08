const Equipment = require('../models/equipmentItems');

const equipmentController = {
  // Render all equipment as a list
  getAllEquipment(req, res) {
    Equipment.find({})
      .then(equipment => {
        res.render('index', { equipment });
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve equipment' });
      });
  },

  // Get a specific equipment by ID
  getEquipmentById({ params }, res) {
    Equipment.findOne({ _id: params.id })
      .then(equipment => {
        if (!equipment) {
          res.status(404).json({ error: 'Equipment not found' });
        } else {
          res.json(equipment);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to retrieve equipment' });
      });
  },

  // Create a new equipment
  createEquipment({ body, res }) {
    Equipment.create(body)
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to create equipment' });
      });
  },


  // Update an existing equipment
  updateEquipment({ params, body }, res) {
    Equipment.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(updatedEquipment => {
        if (!updatedEquipment) {
          res.status(404).json({ error: 'Equipment not found' });
        } else {
          res.json(updatedEquipment);
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to update equipment' });
      });
  },

  deleteEquipment(req, res) {
    const equipmentId = req.params.id;
    Equipment.findOneAndDelete({ _id: equipmentId })
      .then(deletedEquipment => {
        if (!deletedEquipment) {
          res.status(404).json({ error: 'Equipment not found' });
        } else {
          res.json({ message: 'Equipment deleted successfully' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to delete equipment' });
      });
  }
  
};

module.exports = equipmentController;
