const userSchema = require('../Models/usermodels');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const userRegister = async(req,res)=>{
    const { userName, email } = req.body;

    try {
      let newUser;
      
      // Check if a file was uploaded
      if (req.file) {
        // Upload profile picture to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
          folder: 'profile-pics', // Optional folder in Cloudinary
        });
    
        // Save user data with Cloudinary URL
        newUser = new userSchema({
          userName,
          email,
          profile_pic: result.secure_url,
        });
      } else {
        // Save user data without profile picture if no file is uploaded
        newUser = new userSchema({
          userName,
          email,
        });
      }
    
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
    

}

module.exports = {
    userRegister
}