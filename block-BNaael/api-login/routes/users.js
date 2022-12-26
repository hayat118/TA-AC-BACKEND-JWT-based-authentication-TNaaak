var express = require('express');
const { findOne } = require('../models/user');
var router = express.Router();
var User=require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 


// registration
router.post('/register',async (req,res,next)=>{
  try {
    var user= await User.create(req.body);
    console.log(user)
    var token= await user.signToken();
    res.status(201).json({user:user.userJSON(token)})
  } catch (error) {
    next(error);
  }
})

// login

router.post('/login',async (req,res,next)=>{
   var { email , password}=req.body;
   if(!email || !password){
     res.status(400).json({error:"email/password is required"})
   }
   try {
     var user= await User.findOne({email});
     if(!user){
       return res.status(400).json({error:"user/email not found"})
     }
     var result= await user.verifyPassword(password);
     if(!result){
       res.status(400).json({error:"Invalid Password"})
     }

    //  generate token
    var token=await user.signToken();
    res.json({user:user.userJSON()})

   } catch (error) {
     next(error)
   }
})

module.exports = router;
