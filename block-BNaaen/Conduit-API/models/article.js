var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var slug=require('mongoose-slug-generator');


mongoose.plugin(slug);

var articleSchema = new Schema({
  title:{type:String},
  slug:{type:String, slug:"title", unique:true},
  description:{type:String},
  body:{type:String},
  tagList:[{type:String}],
  favourite:{type:Boolean},
  author:{type:Schema.Types.ObjectId, ref:"user"},
  favouriteCount:{type:Number, default:0},
  comments:[{ type:Schema.Types.ObjectId, ref:"Comment" }],
  favouriteList:[{type:Schema.Types.ObjectId, ref:"User"}]
},{timestamps:true});

articleSchema.methods.displayArticle=function(id=null){
  return{
    title:this.title,
    slug:this.slug,
    description:this.description,
    body:this.body,
    tagList:this.tagList,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    favourite: id ? this.favoriteList.includes(id) : false,
    favouriteCount: this.favouriteCount,
    author: this.author.displayUser(id),
  }
}

var Article= mongoose.model("Article", articleSchema);
module.exports=Article;