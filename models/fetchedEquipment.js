const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fetchedEquipmentSchema = new Schema({
  name: String,
  category: String, // category_range
  damage: {
    damage_dice: String,
    damage_type: {
      name: String,
    },
  two_handed_damage: {
    damage_dice: String,
    damage_type: {
      name: String,
    },
  },
  range:{
    normal: {
      type: Number,
      default: null, //default value to null for items without a throw range
    },
    long: {
      type: Number,
      default: null, //default value to null for items without a throw range
    },
  },
  throwRange: {
    normal: {
      type: Number,
      default: null, //default value to null for items without a throw range
    },
    long: {
      type: Number,
      default: null, //default value to null for items without a throw range
    },
  },
  properties: [{
    name: String,
  }],
  equipmentCategory: String,
  weight: Number,
  },
  cost: {
    quantity: Number,
    unit: String,
  },
    desc: []
});


const FetchedEquipment = mongoose.model('FetchedEquipment', fetchedEquipmentSchema);
module.exports = FetchedEquipment;

