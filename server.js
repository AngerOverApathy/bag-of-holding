const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5050;
const url = 'mongodb://127.0.0.1:27017/loot-log';

//import models
const Equipment = require('./models/equipmentItems');
const MagicItem = require('./models/magicItems');

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connected:', url);
});

db.on('error', err => {
  console.error('Connection error:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Route to handle the equipment form submission
app.post('/equipment', (req, res) => {
  // Extract form data for equipment
  const {
    name,
    category_range,
    cost,
    damage,
    range,
    throwRangeNormal,
    throwRangeLong,
    properties,
    equipment_category,
    weight,
    two_handed_damage,
    description
  } = req.body;

  // Extract the necessary properties
  const quantity = cost.quantity;
  const unit = cost.unit;
  const damageDice = damage.damage_dice;
  const damageTypeName = damage.damage_type.name;
  const equipmentCategoryName = equipment_category.name;
  const propertyNames = properties.map(property => property.name);
  const ranges = range ? Object.values(range) : []; // Get all range values if available

  // Create a new Equipment instance
  const newEquipment = new Equipment({
    name,
    category: category_range,
    cost: {
      quantity,
      unit,
    },
    damage: {
      damage_dice: damageDice,
      damage_type: {
        name: damageTypeName,
      },
    },
    range: ranges,
    throwRange: {
      normal: throwRangeNormal || null, // Use null for items without a throw range
      long: throwRangeLong || null, // Use null for items without a throw range
    },
    properties: propertyNames,
    equipmentCategory: equipmentCategoryName,
    weight,
    two_handed_damage: two_handed_damage
      ? {
          damage_dice: two_handed_damage.damage_dice,
          damage_type: {
            name: two_handed_damage.damage_type.name,
          },
        }
      : null,
    description
  });

  // Save the new equipment item to the database
  newEquipment.save((err) => {
    if (err) {
      console.error('Error saving equipment:', err);
      res.sendStatus(500);
    } else {
      console.log('Equipment saved successfully');
      res.sendStatus(200);
    }
  });
});

// Route to handle the magic items form submission
app.post('/magic-items', (req, res) => {
  // Extract form data for magic items
  const { name, equipmentCategoryName, rarityName, description } = req.body;

  // Create a new MagicItem instance
  const newMagicItem = new MagicItem({
    name,
    equipmentCategory: {
      name: equipmentCategoryName,
    },
    rarity: {
      name: rarityName,
    },
    description: description.split('\n'), // Split the description into an array of strings
  });

  // Save the new magic item to the database
  newMagicItem.save((err) => {
    if (err) {
      console.error('Error saving magic item:', err);
      res.sendStatus(500);
    } else {
      console.log('Magic item saved successfully');
      res.sendStatus(200);
    }
  });
});
