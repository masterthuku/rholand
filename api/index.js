import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log(error)
})

const app = express()

app.listen(5000, () => {
    console.log('Server running on port 5000')
})

app.use('/api/user', userRouter)