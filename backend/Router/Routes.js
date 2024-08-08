const {createUser, SendMail,verifyRecord, checkEmailPresent, checkUserLogIn, createChat, getChatNamesAndId, getChatById, updateChatById, renameChat, deleteChat, sendContactMail}=require( '../Controller/RegisterController');


const router = require('express').Router();

router.post("/createUser",createUser);

router.post("/sendmail",SendMail);

router.get("/verify/user/:id/:uniqueStr",verifyRecord);

router.post("/checkmail", checkEmailPresent);

router.post("/checkuserlogin",checkUserLogIn);

router.get("/createChat",createChat);

router.get("/getchatnamesandid",getChatNamesAndId);

router.post("/getchatbyid",getChatById);

router.post("/updatechatbyid", updateChatById);

router.post("/renamechat", renameChat);

router.post("/deletechat",deleteChat);

router.post("/sendContactMail",sendContactMail);

module.exports = router;