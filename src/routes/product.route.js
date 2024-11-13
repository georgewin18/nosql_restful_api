const express = require('express')
const ProductController = require('../contollers/product.controller')
const router = express.Router()

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.createProduct)
router.patch('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router