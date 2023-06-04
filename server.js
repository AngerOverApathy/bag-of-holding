const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5050;
const url = 'mongodb://127.0.0.1:27017/loot-log';
const cors = require('cors');
const dotenv = require('dotenv')

const db = mongoose.connection 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static('public'));

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

app.get('/', async (req,res)=>{
  db.collection('items').find().toArray()
  .then(data=>{
    db.collection('items').countDocuments()
    .then(allItems => {
      res.render('index.html')
    })
  })

  .catch(err => console.error(err))
})




