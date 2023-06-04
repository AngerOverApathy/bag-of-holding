const mongoose = require('mongoose')
const Schema = mongoose.Schema

const equipmentSchema = new Schema({
    name: String,
    category: String,
    damage: {
      damage_dice: String,
      damage_type: {
        name: String,
      },
    },
    two_handed_damage: {
      damage_dice: String,
      damage_type: {
        name: String,
      },
    },
    range: [Number],
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
    properties: [String],
    equipmentCategory: String,
    weight: Number,
    cost: {
      quantity: Number,
      unit: String,
    },
    desc: []
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;