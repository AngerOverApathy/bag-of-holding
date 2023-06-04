const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5050;
const url = 'mongodb://127.0.0.1:27017/loot-log';
const cors = require('cors');
const path = require('path');

//Routes
const htmlRoutes = require('./routes/htmlRoutes');
const equipmentRoutes = require('./api/equipmentRoutes');

// Import models
const Equipment = require('./models/equipmentItems');
const MagicItem = require('./models/magicItems');

//Controllers
const equipmentController = require('./controllers/equipmentController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static('public'));
app.use('/api', htmlRoutes);
app.use('/api/Equipments', equipmentRoutes);

const db = mongoose.connection 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected:', url);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Connection error:', err);
});


