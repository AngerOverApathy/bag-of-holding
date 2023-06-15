const Equipment = require('../models/equipmentItems');
const FetchedEquipment = require('../models/fetchedEquipment');
const MagicItem = require('../models/magicItems');

const equipmentController = {
  // Render all equipment as a list
  async getAllEquipment(req, res) {
    try {
      const equipment = await Equipment.find({});
      const fetchedEquipment = await FetchedEquipment.find({});
      const magicItems = await MagicItem.find({});
      res.render('equipmentList', { equipment, fetchedEquipment, magicItems });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve equipment' });
    }
  },

  // Create a new equipment
  async createEquipment(req, res) {
    try {
      req.body.requiresAttunement = Boolean(req.body.requiresAttunement);
      await Equipment.create(req.body);
      res.redirect('/equipment');
    } catch (error) {
      res.status(500).json({ error: 'Failed to create equipment' });
    }
  },

  // Update an equipment
  async updateEquipment(req, res) {
    const { id } = req.params;
    const updatedEquipment = req.body;

    try {
      await Equipment.findByIdAndUpdate(id, updatedEquipment);
      const updated = await Equipment.findById(id);
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update equipment' });
    }
  },

  // Delete an equipment
  async deleteEquipment(req, res) {
    const { id } = req.params;
    try {
      await Equipment.findByIdAndDelete(id);
      res.redirect('/equipment');
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete equipment' });
    }
  }
};

module.exports = equipmentController;
