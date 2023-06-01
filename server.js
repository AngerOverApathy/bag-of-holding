const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient
// const connectionString = 'mongodb+srv://violasian:acesHIGH35@loot-log.lj9s2a5.mongodb.net/?retryWrites=true&w=majority'
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/loot-log'
const db = mongoose.connection
const Schema = mongoose.Schema

mongoose.connect(url, { useNewUrlParser: true })

db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
