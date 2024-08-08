const Nodemailer=require('nodemailer');
require('dotenv').config();

let transporter=Nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true,
  auth: {
    user : process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  },
  tls:{
        rejectUnauthorized:true
    },
  logger: true, // Log information for debugging
  debug: false, // Show debug output
  connectionTimeout: 60000, // Increase timeout to 10 seconds
  socketTimeout: 60000, // Increase socket timeout to 10 seconds
});

transporter.verify((error, success)=>{
  if(error){
    console.log("There is an error.");
    console.log(error);
  }
  else{
    console.log("ready for messages.");
  }
});

module.exports=transporter;