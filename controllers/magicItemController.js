const MagicItem = require('../models/magicItems');

// Controller for handling magic item related operations

const magicItemController = {
  // Get all magic items
  getAllMagicItems(req, res) {
    MagicItem.find({})
      .then(magicItems => res.json(magicItems))
      .catch(error => res.status(500).json({ error: 'Failed to retrieve magic items' }));
  },

  // Create a new magic item
  createMagicItem({ body }, res) {
    MagicItem.create(body)
      .then(savedMagicItem => res.status(201).json(savedMagicItem))
      .catch(error => res.status(500).json({ error: 'Failed to create magic item' }));
  },

  // Update an existing magic item
  updateMagicItem({ params, body }, res) {
    MagicItem.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(updatedMagicItem => {
        if (!updatedMagicItem) {
          res.status(404).json({ error: 'Magic item not found' });
        } else {
          res.json(updatedMagicItem);
        }
      })
      .catch(error => res.status(500).json({ error: 'Failed to update magic item' }));
  },

  // Delete an existing magic item
  deleteMagicItem({ params }, res) {
    MagicItem.findOneAndDelete({ _id: params.id })
      .then(deletedMagicItem => {
        if (!deletedMagicItem) {
          res.status(404).json({ error: 'Magic item not found' });
        } else {
          res.json({ message: 'Magic item deleted successfully' });
        }
      })
      .catch(error => res.status(500).json({ error: 'Failed to delete magic item' }));
  }
};

module.exports = magicItemController;
