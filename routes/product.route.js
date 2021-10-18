const express = require('express')
const router = express.Router()
const Product= require('../models/product.model')

// Testing query,param and body


router.get('/', async(req,res,next)=>{
    //next(new Error("Listing is not done"))
    //res.send('all products')
    try{
        const results = await Product.find({},{__v:0})
        res.send(results)
    }catch(error){
        console.log(error.message)
    }

})

router.post('/',async(req,res,next)=>{

    try{
        const product = new Product(req.body)
        const result =await product.save()
        res.send(result)

    }catch(errors){
        console.log(error)
    }
   
    
})

router.get('/:id', async(req,res,next)=>{

    try{
        const id= req.params.id
        const results = await Product.findById(id)
        //findOne({_id:id})
        res.send(results)

    }catch(error){
        console.log(error)
    }
   
})

router.patch('/:id',async (req,res,next)=>{
    try{
        const id= req.params.id
        const updates = req.body
        const options= {new:true}
        const result = await Product.findByIdAndUpdate(id,updates,options)
        res.send(result)

    }catch(error){
        console.log(error)
    }
})

router.delete('/:id', async(req,res,next)=>{
    try{
        const id= req.params.id
        const results=await Product.findByIdAndRemove(id)
        res.send(results)

    }catch(error){
        console.log(error.message)
    }
    
})
module.exports=router