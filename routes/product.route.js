const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    next(new Error("Listing is not done"))
    //res.send('all products')
})

router.post('/',(req,res,next)=>{
    res.send('Products created')
})

router.get('/:id', (req,res,next)=>{
    res.send('get single products')
})

router.patch('/:id', (req,res,next)=>{
    res.send('updating single products')
})

router.delete('/:id', (req,res,next)=>{
    res.send('deleting single products')
})
module.exports=router