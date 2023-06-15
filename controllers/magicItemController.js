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
      res.status(200).json(magicItems);
    } catch (error) {
      console.error('Failed to fetch magic items:', error);
      res.status(500).json({ error: 'Failed to fetch magic items' });
    }
  }
};

module.exports = magicItemController;
