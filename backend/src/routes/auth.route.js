import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js'

const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
// router.get('/login',(req,res)=>{
//     res.send("Signup Route")
// })
// router.get('/logout',(req,res)=>{
//     res.send("Signup Route")
// })

export default router