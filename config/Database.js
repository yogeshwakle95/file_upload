const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


const Database=async () => {
      await mongoose.connect("mongodb+srv://yogeshwakle99:Yogesh01@cluster0.eigsk3k.mongodb.net/fileupload").then((data)=>{
        console.log(`mongodb connected with server: ${data.connection.host}`);
      })
    }


module.exports = Database;  