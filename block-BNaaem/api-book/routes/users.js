var express = require('express');
const User = require('../models/user');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register
router.post('/register',async (req,res,next)=>{
   try {
     var user= await User.create(req.body);
     console.log(user);
     var token=await user.signToken();
    //  console.log(token, "token")
     res.status(201).json({ user:user.userJSON(token) })
   } catch (error) {
     next(error)
   }
})

// login

router.post('/login',async (req,res,next)=>{
  var {email, password}= req.body;
  console.log(email , password, "body")

  if(!email || !password){
    return res.status(400).json({error:"email/passsword is required"})
  }
  try {
    var user= await User.findOne({email})
      // console.log(user, "user1")

    if(!user){
      return res.status(400).json({error:"user/email not found"})
    }
   var result= await user.verifyPassword(password);
   if(!result){
     return res.status(400).json({error:"Invalid Password"})
   }
  //  generate token
  var token=await user.signToken();
  res.json({user:user.userJSON(token)})

  } catch (error) {
    next (error);
  }
})

module.exports = router;
