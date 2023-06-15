require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5050;

// Models
const Equipment = require('./models/equipmentItems.js');
const FetchedEquipment = require('./models/fetchedEquipment.js');
const MagicItem = require('./models/magicItems.js');

// Controllers
const equipmentController = require('./controllers/equipmentController.js');
const fetchedEquipmentController = require('./controllers/fetchedEquipmentController.js');
const magicItemController = require('./controllers/magicItemController.js');

// Route files
const htmlRoutes = require('./routes/api/htmlRoutes.js');
const equipmentRoutes = require('./routes/api/equipmentRoutes.js');
const fetchedEquipmentRoutes = require('./routes/api/fetchedEquipmentRoutes.js');
const magicItemRoutes = require('./routes/api/magicItemRoutes.js');

// database.js
const mongoose = require('./config/database.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/api/saveFetchedEquipment', fetchedEquipmentRoutes);
app.use('/api/saveMagicItem', magicItemRoutes);

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
