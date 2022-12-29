var mongoose=require('mongoose');
var Schema= mongoose.Schema;
var jwt=require('jsonwebtoken')

var bcrypt=require('bcrypt');

var userSchema= new Schema({
  username:{type:String},
  email:{type:String,unique:true},
  password:{type:String, minlength:5, required:true},
  bio:{type:String},
  image:{type:String},
  following:{type:Boolean},
  followingList:{type:Schema.Types.ObjectId, ref:"User"},
  followersList:{type:Schema.Types.ObjectId, ref:"User"}
},{timestamps:true});

userSchema.pre("save", async function(next){
  if(this.password && this.isModified('password')){
    this.password= await bcrypt.hash(this.password,10)
  }
  next()
})

userSchema.methods.verifyPassword= async function(password){
  try {
    result= await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
  bcrypt.compare();
}

userSchema.methods.signToken= async function(){
  var payload= {userId:this.id, email:this.email}
  try {
    var token= await jwt.sign(payload,"thisissecret");
    return token;
  } catch (error) {
    return error
  }
}

userSchema.methods.userJSON = function(token) {
  // console.log(this, 'this')
  return{
    username:this.username,
    email:this.email,
    bio:this.bio,
    token:token
  }
}

// userSchema.methods.displayUser= async function(id=null){
//   return{
//     username:this.username,
//     email:this.email,
//     bio:this.bio,
//     image:this.image,
//     following: id ? this.followersList.includes(id) : false,
//   }
// }



var User=mongoose.model("User",userSchema);
module.exports=User;