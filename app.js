const express = require('express')
const ProductRoute = require('./routes/product.route')
const mongoose = require('mongoose')
const app = express()

mongoose.connect("mongodb+srv://cluster0.2oh5w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/", {
    dbName: "product_db",
    user: "admin",
    pass: "India_123"
})
    .then(() => {
        console.log('DB is connected')
    })

app.use('/products', ProductRoute)

// app.use((req,res,next)=>{
//     res.status(404)
//     res.json({
//         message:"Not Found"
//     })
// })

app.use((req, res, next) => {
    const err = new Error('NOT FOUND!')
    err.status = 404
    next(err)
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