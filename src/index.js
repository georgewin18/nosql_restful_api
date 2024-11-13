require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')

const app = express()
const port = process.env.PORT || 8888

app.use(express.json())

app.get('/', (req, res) => {
  res.send("hello")
})

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.patch('/api/products/:id', async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndUpdate(id, req.body)
    if (!product) {
      return res.status(404).json({
        message: "product not found"
      })
    }
    const updatedProduct = await Product.findById(id)
    res.status(201).json(updatedProduct)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.patch('/api/product/:id', async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      })
    }
    res.status(200).json({
      message: "Product deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

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
