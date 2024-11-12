require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT || 8888

app.get('/', (req, res) => {
  res.send("hello")
})

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})