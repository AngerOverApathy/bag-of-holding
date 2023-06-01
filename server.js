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
app.post('/equipment', async (req, res) => {
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
  } = req.body;

  try {
    // Check if the equipment already exists in the database
    let existingEquipment = await Equipment.findOne({ name });

    if (existingEquipment) {
      // Equipment already exists, update its details
      existingEquipment.category = category_range;
      existingEquipment.cost = { quantity: cost.quantity, unit: cost.unit };
      existingEquipment.damage = {
        damage_dice: damage.damage_dice,
        damage_type: { name: damage.damage_type.name },
      };
      existingEquipment.range = range ? Object.values(range) : [];
      existingEquipment.throwRange = {
        normal: throwRangeNormal || null,
        long: throwRangeLong || null,
      };
      existingEquipment.properties = properties.map(property => property.name);
      existingEquipment.equipmentCategory = equipment_category.name;
      existingEquipment.weight = weight;
      existingEquipment.two_handed_damage = two_handed_damage
        ? {
            damage_dice: two_handed_damage.damage_dice,
            damage_type: { name: two_handed_damage.damage_type.name },
          }
        : null;

      await existingEquipment.save();
    } else {
      // Equipment doesn't exist, create a new item
      const newEquipment = new Equipment({
        name,
        category: category_range,
        cost: { quantity: cost.quantity, unit: cost.unit },
        damage: {
          damage_dice: damage.damage_dice,
          damage_type: { name: damage.damage_type.name },
        },
        range: range ? Object.values(range) : [],
        throwRange: {
          normal: throwRangeNormal || null,
          long: throwRangeLong || null,
        },
        properties: properties.map(property => property.name),
        equipmentCategory: equipment_category.name,
        weight,
        two_handed_damage: two_handed_damage
          ? {
              damage_dice: two_handed_damage.damage_dice,
              damage_type: { name: two_handed_damage.damage_type.name },
            }
          : null,
      });

      await newEquipment.save();
    }

    console.log('Equipment saved successfully');
    res.redirect('/');
  } catch (error) {
    console.error('Error saving equipment:', error);
    res.sendStatus(500);
  }
});

// Route to handle the magic items form submission
app.post('/magic-items', async (req, res) => {
  // Extract form data for magic items
  const { name, equipmentCategoryName, rarityName, description } = req.body;

  try {
    // Check if the magic item already exists in the database
    let existingMagicItem = await MagicItem.findOne({ name });

    if (existingMagicItem) {
      // Magic item already exists, update its details
      existingMagicItem.equipmentCategory.name = equipmentCategoryName;
      existingMagicItem.rarity.name = rarityName;
      existingMagicItem.description = description.split('\n');

      await existingMagicItem.save();
    } else {
      // Magic item doesn't exist, create a new item
      const newMagicItem = new MagicItem({
        name,
        equipmentCategory: { name: equipmentCategoryName },
        rarity: { name: rarityName },
        description: description.split('\n'),
      });

      await newMagicItem.save();
    }

    console.log('Magic item saved successfully');
    res.redirect('/');
  } catch (error) {
    console.error('Error saving magic item:', error);
    res.sendStatus(500);
  }
});


