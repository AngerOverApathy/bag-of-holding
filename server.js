const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = ''

let db;

const PORT = process.env.PORT || 5050

app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`)
  })