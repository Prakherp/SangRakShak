const {createUser, SendMail,verifyRecord, checkEmailPresent, checkUserLogIn}=require( '../Controller/RegisterController');


const router = require('express').Router();

router.post("/createUser",createUser);

router.post("/sendmail",SendMail);

router.get("/verify/user/:id/:uniqueStr",verifyRecord);

router.post("/checkmail", checkEmailPresent);

router.post("/checkuserlogin",checkUserLogIn);


module.exports = router;