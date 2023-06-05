const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5050;
const url = 'mongodb://127.0.0.1:27017/loot-log';
const cors = require('cors');
const dotenv = require('dotenv')

//models
const Equipment = require('./models/equipmentItems.js')
const MagicItem = require('./models/magicItems.js')

//routes
const equipmentRoutes = require('./routes/api/equipmentroutes');
const magicRoutes = require('./routes/api/magicRoutes.js')
const htmlRoutes = require('./routes/api/htmlroutes');

let db; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static('public'));

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected:', url);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      db = mongoose.connection.db
    });
  })
  .catch(err => {
    console.error('Connection error:', err);
});

app.use('/', htmlRoutes);
app.use('/', equipmentRoutes);
app.use('/', magicRoutes)

