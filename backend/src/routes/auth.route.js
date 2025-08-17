import express from 'express'
import { login, logout, onboard, signup } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

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

router.post("/onboarding", protectRoute, onboard)

router.get("/me", protectRoute, (req, res)=>{
    res.status(200).json({success: true, user: req.user})
}) // this route checks if the user is authenticated or not

export default router