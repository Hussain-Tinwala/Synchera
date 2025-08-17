import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import { connectDB } from './lib/db.js'
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()
const PORT = process.env.PORT


app.use(express.json()); // to fetch the data from the request body
app.use(cookieParser()) // for passing cookies between the requests
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// app.get('/api/auth/signup',(req,res)=>{
//     res.send("sign up ")
// })
// app.get('/api/auth/signin',(req,res)=>{
//     res.send("sign in ")
// })
// app.get('/api/auth/logout',(req,res)=>{
//     res.send("log out ")
// })

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
    connectDB()

}
)