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

  // Update an equipment
  // updateEquipment(req, res) {
  //   const { id } = req.params;
  //   const updatedEquipment = req.body;

  //   Equipment.findByIdAndUpdate(id, updatedEquipment)
  //     .then(() => {
  //       res.redirect('/equipment');
  //     })
  //     .catch(error => {
  //       res.status(500).json({ error: 'Failed to update equipment' });
  //     });
  //   },

  // Update an equipment
updateEquipment(req, res) {
  const { id } = req.params;
  const updatedEquipment = req.body;

  Equipment.findByIdAndUpdate(id, updatedEquipment)
    .then(() => {
      Equipment.findById(id)
        .then(updated => {
          res.status(200).json(updated); // Send the updated equipment as a JSON response
        })
        .catch(error => {
          res.status(500).json({ error: 'Failed to fetch updated equipment' });
        });
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update equipment' });
    });
},

  // Delete an equipment
  deleteEquipment(req, res) {
    const { id } = req.params;
    Equipment.findByIdAndDelete(id)
      .then(() => {
        res.redirect('/equipment');
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to delete equipment' });
      });
  }
};

module.exports = equipmentController;
