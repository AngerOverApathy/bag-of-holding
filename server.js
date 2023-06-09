require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5050;
const mongoURI = process.env.MONGODB_URI; // MongoDB Atlas connection string
const cors = require('cors');

// Models
const Equipment = require('./models/equipmentItems.js');

// Controllers
const equipmentController = require('./controllers/equipmentController.js');

// Route files
const htmlRoutes = require('./routes/api/htmlRoutes.js');
const equipmentRoutes = require('./routes/api/equipmentRoutes.js');
const indexRoutes = require('./routes/router.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/equipment', equipmentRoutes)

app.set('view engine', 'ejs');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Connection error:', err);
});


