const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fetchedEquipmentSchema = new Schema({
  name: String,
  category_range: {
    type: String,
    default: '',
  },
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
  },
  range: {
    normal: {
      type: Number,
      default: null,
    },
    long: {
      type: Number,
      default: null,
    },
  },
  throwRange: {
    normal: {
      type: Number,
      default: null,
    },
    long: {
      type: Number,
      default: null,
    },
  },
  properties: [
    {
      name: String,
    },
  ],
  equipment_category: {
    name: {
      type: String,
    },
  },
  weight: {
    type: Number,
    default: 0,
  },
  cost: {
    quantity: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: '',
    },
  },
  desc: {
    type: [String],
    default: [],
  },
});

const FetchedEquipment = mongoose.model('FetchedEquipment', fetchedEquipmentSchema);
module.exports = FetchedEquipment;
