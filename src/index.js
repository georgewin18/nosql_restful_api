require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')
const ProductRoutes = require('./routes/product.route')

const app = express()
const port = process.env.PORT || 8888

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send("hello")
})

app.use('/api/products', ProductRoutes)

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
