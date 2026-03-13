const express = require('express');
const authController = require("../controllers/auth.controller")
const multer = require('multer');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
})


router.post('/register', upload.single("photo"), authController.registerUser)

router.post('/login', authController.loginUser)

router.post('/logout', authController.logoutUser)




module.exports = router;