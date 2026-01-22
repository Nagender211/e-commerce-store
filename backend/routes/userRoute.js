import express from 'express'
import { Testing } from '../controllers/UserControllers.js'
const router=express.Router()
router.get('/',Testing)

export default router;