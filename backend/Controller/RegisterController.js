const UserVerification=require('../Model/UserVerification');
const User=require( '../Model/UserModel');
const transporter= require("../Model/Mailer");
const {v4:uuidv4}=require("uuid");
const bcrypt = require("bcryptjs");


const SendMail = async (req,res)=>{
  console.log(req.body);
  transporter.sendMail({
    from: req.body.sender,
    to: req.body.reciever,
    subject: req.body.subject,
    html: req.body.html
  },function(err,info){
    if(err){
      console.log(err);
      res.status(500).json({
        message: "Mail was not sent",
        success: false
      });
    }
    else{
      console.log("Mail sent successfully to: ",req.body.reciever);
      res.status(200).json({
        message: "Mail sent",
        success: true
      });
    }
  });
}

const checkEmailPresent = async (req,res) =>{
  console.log("In checkEmail");
  await User.find({email: req.body.email}).then((result)=>{
    console.log("Result size ",result.length);
    if(result.length){
      console.log("The mail is already present");
      res.status(200).json({
        messgae: "The mail is already present.",
        present: true
      });
    }
    else{
      res.status(200).json({
        messgae: "The mail is not already present.",
        present: false
      });
    }
  }).catch(err=>{
    console.log("There was an error in checking whether email is present: ",err);
    res.status(500).json({
      messgae: "There was an error in checking whether email is present.",
      present: false
    }); 
  });
};


const createUser= async (req,res)=>{
  const data = req.body;
  const userInstance= await new User(data);
  console.log(userInstance.email);
  await userInstance.save().then(()=>{
    console.log("User is created.");
    const url=process.env.BASE_URL;
    const uniqueId= uuidv4() + userInstance._id;
    const verificationLink=`${url}/tasks/verify/user/${userInstance._id}/${uniqueId}`;
    const message=`<p> Hi ${req.body.username},<p><br><p>Plase click on the following link to verify your email on <em>SANGRAKSHAK</em>:</p><br> <a href="${verificationLink}">${verificationLink}</a><br><br><p>Thank you<br> Sangrakshak Team</p>`;
    
    bcrypt.hash(uniqueId,10).then((hashedId)=>{
      const UserVerificationObject={
        userId: userInstance._id,
        uniqueString: hashedId,
        createdAt: Date.now(),
        expiresAt: Date.now() + 5*60*60*1000
      };
      const MailOobject = {
        from: process.env.AUTH_EMAIL,
        to: userInstance.email,
        subject: "To Verify Your Email",
        message: message
      };
      createUserVerification(UserVerificationObject,MailOobject);
    }).catch((err)=>{
      console.log("Error in hashing the Verification record: ",err);
    });

    res.status(200).json({
      message: "User is successfully created.",
      success: true
    });
  }).catch((err)=>{
    console.log("Error in creating User: ",err);
    res.status(500).json({
      message: "Error in creating User",
      success: false
    });
  })
};


const deleteUser = async(req,res)=>{
  const id = req.params.id;
  await User.findOneAndDelete({_id: id}).then(()=>{
    console.log("The user record is deleted.");
    res.staus(500).json({
      message: "The User is successfully deleted.",
      success: true
    });
  }).catch((err)=>{
    res.status(500).json({
      message:"The user record is not deleted. Try again.",
      success: false
    });
  });
}

async function createUserVerification(data, MailObject){
  const userVerificationInstance= await new UserVerification(data);
  await userVerificationInstance.save().then(()=>{
    console.log("User Verification record is created.");
    transporter.sendMail({
      from: MailObject.from,
      to: MailObject.to,
      subject: MailObject.subject,
      html: MailObject.message
    }).then(()=>{
      console.log("Mail was successfully sent to: ",MailObject.to);
    }).catch((err)=>{
      console.log("An error has occured while sending the mail.");
    }); 
  }).catch((err)=>{
    console.log("Error in creating User Verification record: ",err);
  });
};

const verifyRecord = async (req,res)=>{
  const id=req.params.id;
  const uniqueStr = req.params.uniqueStr;
  await User.updateOne({_id : id},{$set: {verified: true}}).then(()=>{
    UserVerification.findOne({userId: id}).then((result)=>{

      if(result){   //result for UserId exists in User Verification
        if(result.expiresAt > Date.now()){
          bcrypt.compare(uniqueStr,result.uniqueString).then((isMatched)=>{
            if(isMatched){
              console.log("Email is successfully verified.");
              res.status(200).json({
                message: "The mail is successfully verified.",
                success: true
              }); 
            }
            else{
              console.log("Unique link does not match. Invalid.");
              res.status(500).json({
                message: "Invalid verification link.",
                success: false
              }); 
            }
          });
        }
        else{   //The link is Expired.
          console.log("The link has been expired.");

          User.findOneAndDelete({_id: id}).then(()=>{
            console.log("The user record is deleted due to expired link");
            res.status(500).json({
              message: "The verification link has been expired. Sign up again to register.",
              success: false
            });
          }).catch((err)=>{
            console.log("The user record could not deleted on receiving expired link.");
            res.status(500).json({
              message: "Error in verification process. Try Again.",
              success: false
            }); 
          }); 
        }
      }     
      else{ //result for user id does not exist in User Verification
        console.log("The verification record is not present.");
        res.status(500).json({
          message: "The verification record is not present. Error in verification process. Try Again.",
          success: false
        });  
      }
    }).catch((err)=>{   
      console.log("Error in email verification process: ",err);
      res.status(500).json({
        message: "Error in verification process. Try Again.",
        success: false
      }); 
    })
  }).catch((err)=>{
    console.log("Invalid User: ",err);
    res.status(500).json({
      message: "There's no user record. Invalid link for verification.",
      success: false
    }); 
  });
}


const checkUserLogIn = async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log("Password: ",password);
  await User.findOne({email: email}).then(result=>{
    console.log(result);
      if(result){
        bcrypt.compare(password,result.password).then(passwordMatched=>{
          if(passwordMatched && result.verified){
            res.status(200).json({
              message: "LogIn successful.",
              success: true
            });
          }
          else if (!result.verified){
            res.status(200).json({
              message: "LogIn Unsuccessful. Please verify your email.",
              success: false
            });
          }
          else{
            res.status(200).json({
              message: "LogIn Unsuccessful. Password entered is incorrect.",
              success: false
            });
          }
        }).catch(err=>{
          res.status(500).json({
            message: "Error in Login Process.",
            success: false
          });   
        })
      }
      else{
        res.status(200).json({
          message: "No registered user with entered email.",
          success: false
        }); 
      }
    }).catch(err=>{
      console.log("Error in Login Process: ",err);
      res.status(500).json({
        message: "Error in Login Process.",
        success: false
      });  
    });
};

module.exports={
  createUser,
  SendMail,
  verifyRecord,
  checkEmailPresent,
  checkUserLogIn
}
