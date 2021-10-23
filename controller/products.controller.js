const Product = require('../models/product.model')
const createError = require('http-errors')
const mongoose = require('mongoose')

module.exports={
    "getAllProducts":async (req, res, next) => {
        //next(new Error("Listing is not done"))
        //res.send('all products')
        try {
            const results = await Product.find({}, { __v: 0 })
            if (!results) {
                throw createError(404, "Products NOT FOUND!")
            }
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
    
    },
    "createProduct":async (req, res, next) => {

        try {
            const product = new Product(req.body)
            const result = await product.save()
            res.send(result)
    
        } catch (error) {
            //console.log(error)
            if(error.name==='ValidationError'){
                next(createError(422,error.message))
                return
            }
            next(error)
        }
    
    
    },
    "getProductById": async (req, res, next) => {

        try {
            const id = req.params.id
            const results = await Product.findById(id)
            //findOne({_id:id})
    
            if (!results) {
                throw createError(404, "Product does not exists!")
            }
            res.send(results)
    
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid product id"))
                return
            }
            next(error)
        }
    
    },
    "updateProductById":async (req, res, next) => {
        try {
            const id = req.params.id
            const updates = req.body
            const options = { new: true }
            const result = await Product.findByIdAndUpdate(id, updates, options)
            if (!result) {
                throw createError(404, "Product does not exists!")
            }
            res.send(result)
    
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid product id"))
                return
            }
            next(error)
        }
    },
    "deleteProductById":async (req, res, next) => {
        try {
            const id = req.params.id
            const results = await Product.findByIdAndRemove(id)
            if (!results) {
                throw createError(404, "Product does not exists!")
            }
            res.send(results)
    
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid product id"))
                return
            }
            next(error)
        }
    
    }
}