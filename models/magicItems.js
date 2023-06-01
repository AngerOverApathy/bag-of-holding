const mongoose = require('mongoose')
const Schema = mongoose.Schema

const magicItemsSchema = new Schema({
    ame: String,
  equipmentCategory: {
    name: String,
  },
  rarity: {
    name: String,
  },
  description: [String],
});

const MagicItem = mongoose.model('MagicItem', magicItemsSchema);

module.exports = MagicItem;