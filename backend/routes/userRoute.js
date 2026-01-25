import express from 'express'
import { confirmOtp, confirmVerificationOtp, deleteProfile, forgotPassword, getMe, Login, logout, Register, restPassword, sendOtpVerification, Testing, updateProfile } from '../controllers/UserControllers.js'
import { requireProtected } from '../middleware/auth.js'
import { verifyEmailProtected } from '../middleware/verifyEmailMidd.js'
const router=express.Router()
router.get('/',Testing)

// user routeing
router.post('/register',Register)
router.post('/login',Login)
router.post('/forgot-password',forgotPassword);
router.post('/confirm-otp',confirmOtp)
router.post('/reset-password',restPassword)
router.post('/delete/:id',requireProtected,deleteProfile)
router.post('/profile/:id',requireProtected,updateProfile)
router.post('/logout',requireProtected,logout)
router.get('/me',requireProtected,getMe)
router.post('/verify-email',requireProtected,sendOtpVerification)
router.post('/confirm-email-otp',requireProtected,confirmVerificationOtp)


export default router;