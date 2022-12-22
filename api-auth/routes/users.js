const { json } = require('express');
var express = require('express');
var router = express.Router();

var User=require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json({message:"Users Information"})
});

// registration

router.post('/register',async (req,res,next)=>{
  try {
    var user= await User.create(req.body);
    console.log(user)
    res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
})

// login
router.post('/login', async(req,res,next)=>{
  var { email ,password }=req.body;
  if(!email || !password){
    return json.status(400).json({error:"email/password is required"})
  }
  try {
    var user= await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"user/email not found"})
    }
   var result=await user.verifyPassword(password)
    //  console.log(user,result)
    if(!result){
      return res.status(400).json({error:"Invalid password"})
    }
    // generate token
  } catch (error) {
    next(error)
  }
})

module.exports = router;
