const FetchedEquipment = require('../models/fetchedEquipment');

const fetchedEquipmentController = {
  //GET fetched equipment from DB
  async getFetchedEquipment(req, res) {
    try {
      const fetchedEquipment = await FetchedEquipment.find();
      const equipment = []; // Empty array since we're only rendering fetched equipment
    
      res.render('equipmentList', { equipment, fetchedEquipment });
    } catch (error) {
      console.error('Failed to fetch equipment:', error);
      res.status(500).json({ error: 'Failed to fetch equipment' });
    }
  },

  //save fetched equipment to DB
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

  //update
  async updateFetchedEquipment(req, res) {
    const { id } = req.params;
    const updatedEquipmentData = req.body;

    try {
      const updatedEquipment = await FetchedEquipment.findByIdAndUpdate(
        id,
        updatedEquipmentData,
        { new: true }
      );

      if (!updatedEquipment) {
        return res.status(404).json({ error: 'Equipment not found' });
      }

      console.log('Equipment updated successfully:', updatedEquipment);
      res.status(200).json(updatedEquipment);
    } catch (error) {
      console.error('Failed to update equipment:', error);
      res.status(500).json({ error: 'Failed to update equipment' });
    }
  },

  //delete fetched equipment
  async deleteFetchedEquipment(req, res) {
    const { id } = req.params;
    try {
      const deletedEquipment = await FetchedEquipment.findByIdAndDelete(id);
      if (!deletedEquipment) {
        return res.status(404).json({ error: 'Equipment not found' });
      }
      res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error) {
      console.error('Failed to delete equipment:', error);
      res.status(500).json({ error: 'Failed to delete equipment' });
    }
  }
};

module.exports = fetchedEquipmentController;
