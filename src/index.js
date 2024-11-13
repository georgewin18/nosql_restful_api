require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 8888

mongoose.connect(process.env.CONN_STRING)
.then(() => {
  console.log('connected to database')
  app.listen(port, () => {
    console.log(`server running on port ${port}`)
  })
})
.catch((err) => {
  console.log(err)
})

app.get('/', (req, res) => {
  res.send("hello")
})