import express from 'express'
import { confirmOtp, confirmVerificationOtp, deleteProfile, forgotPassword, getMe, Login, logout, Register, restPassword, sendOtpVerification, Testing, updateProfile } from '../controllers/UserControllers.js'
import { requireProtected } from '../middleware/auth.js'
import { verifyEmailProtected } from '../middleware/verifyEmailMidd.js'
import { createProducts, editProduct, getAllPost, getMyProducts, singelPost } from '../controllers/ProductController.js'
import {upload} from '../utiles/uploads.js'
import { createKyc } from '../controllers/kycController.js'
import { kycapproved } from '../middleware/kycApproved.js'
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
router.post('/confirm-email-otp',requireProtected,confirmVerificationOtp);


// product creating
router.post('/create-product',requireProtected,verifyEmailProtected,upload.array("images", 5),createProducts)
router.put('/product/:id',requireProtected,verifyEmailProtected,upload.array("images", 5),editProduct)
router.get('/all-product',getAllPost);
router.get('/inner-detailes/:id',singelPost);

router.get('/my-products',requireProtected,verifyEmailProtected,getMyProducts)
router.post('/kyc',requireProtected,verifyEmailProtected,upload.fields([ { name: "pancard", maxCount: 1 }, { name: "holderphoto", maxCount: 1 }, ]),createKyc)


export default router;