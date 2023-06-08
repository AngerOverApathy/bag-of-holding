const mongoose = require('mongoose')
const Schema = mongoose.Schema

const equipmentSchema = new Schema({
  name: String,
  category: String,
  damage_dice: String,
  damage_type_name: String,
  two_handed_damage_dice: String,
  two_handed_damage_type_name: String,
  range_normal: Number,
  range_long: Number,
  range_normal_default: Number,
  range_long_default: Number,
  throw_range_normal: Number,
  throw_range_long: Number,
  throw_range_normal_default: Number,
  throw_range_long_default: Number,
  properties: [String],
  equipmentCategory: String,
  weight: Number,
  cost_quantity: Number,
  cost_unit: String,
  desc: [String],
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;