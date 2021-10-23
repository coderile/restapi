const express = require('express')
const router = express.Router()
const Product = require('../models/product.model')
const createError = require('http-errors')
const mongoose = require('mongoose')

const ProductController = require('../controller/products.controller')

// Testing query,param and body


router.get('/', ProductController.getAllProducts)
    .post('/', ProductController.createProduct)

router.get('/:id', ProductController.getProductById)
    .patch('/:id', ProductController.updateProductById)
    .delete('/:id', ProductController.deleteProductById)
module.exports = router