var express = require('express');
var router = express.Router();
var auth=require('../middleware/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 
router.get('/dashboard',auth.verifyToken,(req,res,next)=>{
  console.log(req.user);
  res.json({access:"Protected Resource"})
})
// 
router.get('/loggedin',auth.verifyToken,(req,res,next)=>{
   res.status(200).json({access:"You Are Logged In"})
})


module.exports = router;
