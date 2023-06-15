const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const magicItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: [String],
    default: [],
  },
  equipment_category: {
    name: {
      type: String,
      default: '',
    },
  },
  rarity: {
    name: {
      type: String,
    },
  },
});

const MagicItem = mongoose.model('MagicItem', magicItemsSchema);

module.exports = MagicItem;