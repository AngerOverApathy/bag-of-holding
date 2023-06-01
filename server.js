const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/loot-log';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected:', url);
});
db.on('error', err => {
  console.error('Connection error:', err);
});

const equipmentSchema = new mongoose.Schema({
  name: String,
  category: String, //category_range
  damage: String,
  damageType: String,
  range: String,
  throwRange: String,
  properties: String,
  equipmentCategory: String,
  cost: String,
  weight: Number
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

app.use(bodyParser.urlencoded({ extended: true }));

// Create a route to handle the form submission
app.post('/equipment', (req, res) => {
  const { name, category, damage } = req.body;

  // Create a new Equipment instance
  const newEquipment = new Equipment({
    name,
    category,
    damage,
    // Assign other properties as needed
  });

  // Save the new equipment item to the database
  newEquipment.save((err) => {
    if (err) {
      console.error('Error saving equipment:', err);
      res.sendStatus(500);
    } else {
      console.log('Equipment saved successfully');
      res.redirect('/');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
