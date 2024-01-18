// const route = require('express').Router();
// const {userRegister} = require('../Controllers/usercontroller')
// const multer = require('multer');
// // Multer configuration for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // route.post('/user',userRegister);

// // Route for user registration with file upload
// route.post('/user', upload.single('profilePic'), userRegister);
// module.exports = route

const express = require('express');
const cloudinary = require('cloudinary').v2;
const userSchema = require('../Models/usermodels');
const router = new express.Router();
const moment = require('moment');
const multer = require('multer');


cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});

// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
            callback(null,true)
    }else{
        callback(new Error("Only image is allowed"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

// user register
router.post("/register",upload.single("photo"),async(req,res)=>{
    // console.log(req.file);
    const upload = await cloudinary.uploader.upload(req.file.path)
    // console.log(upload);
    const {name} = req.body;
    try {
        const date = moment(new Date()).format("YYYY-MM-DD");

        const userData = new userSchema({
            name:name,
            profile_pic:upload.secure_url,
            date:date
        })
        const result = await userData.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(401).json({message:"error occurs"+error})
    }
})

// user data get
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await userSchema.find();
        res.status(201).json(getUser);

    } catch (error) {
        res.status(401).json(error)
        
    }
})

module.exports = router;