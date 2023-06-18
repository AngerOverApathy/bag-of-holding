const MagicItem = require('../models/magicItems');

const magicItemController = {
  saveMagicItemToDatabase(req, res) {
    const magicItemData = req.body;

    MagicItem.create(magicItemData)
      .then(savedMagicItem => {
        console.log('Magic item saved successfully:', savedMagicItem);
        res.status(201).json(savedMagicItem);
      })
      .catch(error => {
        console.error('Failed to save magic item:', error);
        res.status(500).json({ error: 'Failed to save magic item' });
      });
  },

  async getMagicItems(req, res) {
    try {
      const magicItems = await MagicItem.find();
      const equipment = []; // Empty array since we're only rendering magic items

      console.log('getMagicItems function called');
      
      res.render('equipmentList', { equipment, magicItems });
    } catch (error) {
      console.error('Failed to fetch magic items:', error);
      res.status(500).json({ error: 'Failed to fetch magic items' });
    }
  },

  async deleteMagicItem(req, res) {
    try {
      const magicItemId = req.params.id;
      const magicItem = await MagicItem.findByIdAndDelete(magicItemId);
  
      if (!magicItem) {
        return res.status(404).json({ error: 'Magic item not found' });
      }
  
      console.log('Magic item deleted successfully:', magicItemId);
      res.status(200).json({ message: 'Magic item deleted successfully' });
    } catch (error) {
      console.error('Failed to delete magic item:', error);
      res.status(500).json({ error: 'Failed to delete magic item' });
    }
  }  
};

module.exports = magicItemController;
