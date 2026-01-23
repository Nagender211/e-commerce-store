import express from 'express'
import { Login, Register, Testing } from '../controllers/UserControllers.js'
const router=express.Router()
router.get('/',Testing)

// user routeing
router.post('/register',Register)
router.post('/login',Login)


export default router;