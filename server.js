const express = require('express')
const taskRoute = require('./routes/task/task')
const userRoute = require('./routes/user/user')
const {redisClient}=require('./utils/cache/redis')
require('dotenv').config()
const conn = require('./config/dbconfig')
const app = express()




app.use(function (req, res, next) {
    req.conn = conn
    redisClient
    next()
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routes
app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)
app.get('*',(req,res)=>{
    res.status(404).json({msg:"PAGE NOT FOUND"})
})


//server listening on PORT
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})