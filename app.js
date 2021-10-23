const express = require('express')
const ProductRoute = require('./routes/product.route')
const mongoose = require('mongoose')
const app = express()
const createError= require('http-errors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://cluster0.2oh5w.mongodb.net/", {
    dbName: "product_db",
    user: "admin",
    pass: "India_123"
})
    .then(() => {
        console.log('DB is connected')
    })
    .catch(err=>console.log(err.message))

    // app.all('/:id',(req,res,next)=>{
    //     // ?name=amit&age=30
    //     // res.send(req.query)
    //     res.send(req.params)
    // })
app.all("/test",(req,res,next)=>{
    res.send(req.body)
})
app.use('/products', ProductRoute)

// app.use((req,res,next)=>{
//     res.status(404)
//     res.json({
//         message:"Not Found"
//     })
// })

// app.use((req, res, next) => {
//     const err = new Error('NOT FOUND!')
//     err.status = 404
//     next(err)
// })

app.use((req,res,next)=>{
    next(createError(404,'NOT FOUND!'))

})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(3000, () => {
    console.log(`Server started at port 3000`)
})