var express=require('express')
var router=express.Router();
var auth=require('../middleware/auth');

var Book=require('../models/book');
var Comment=require('../models/comment');

// 
router.get('/',(req,res,next)=>{
    Book.find({},(err,books)=>{
        if(err) return res.status(500).json(err);
        res.json({books})
    })
})
// 
router.get('/:id',(req,res,next)=>{
    var id = req.params.id;
    Book.findById(id,(err,book)=>{
        if(err) return res.status(500).json(err);
        res.json({book})
    })
})

// 
router.post('/',(req,res,next)=>{
    Book.create(req.body,(err,books)=>{
        if(err) return res.status(500).json(err)
        res.json({books})
    })
})

// 

router.put('/:id/edit',(req,res,next)=>{
    var id = req.params.id;
    Book.findByIdAndUpdate(id,(err,update)=>{
        if(err) return res.status(500).json(err);
        res.json({update});
    })
})
// 
router.get('/:id/delete',(req,res,next)=>{
    Book.findByIdAndDelete(id,(err,dele)=>{
        if(err) return res.status(500).json(err);
        res.json({dele});
    })
})

// comments

router.post('/:id/comment',(req,res,next)=>{
    var id = req.params.id;
    // console.log(req.body,"commentBody")
    // req.body.bookId = id;
    Comment.create(req.body, (err,comment)=>{
    //   console.log(err,comment,"comment")
        if(err) return res.status(500).json(err)
        Book.findByIdAndUpdate(id,{$push:{commentId:comment.id}},(err,book)=>{
            if(err) return res.status(500).json(err);
            res.status(201).json({comment})
        })
        
    })
})


router.put('/comment/:id/edit',(req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,(err,update)=>{
        if(err) return res.status(500).json(err);
        res.json({update});
    })
})

// delete comment

router.get('/comment/:id/delete',(req,res,next)=>{
    var id=req.params.id;
    Comment.findByIdAndDelete(id,(err,comment)=>{
        if(err) return res.status(500).json(err);
        console.log(comment, "commentsss")
    Book.findByIdAndUpdate(comment.bookId,{$pull:{commentId:id}},{new:true},(err,book)=>{
        res.json({book})
    })    
    })
})


// router.get('/comment/:id/delete',(req,res,next)=>{
//     var id = req.params.id;
//     Comment.findByIdAndDelete(id,(err,delecom)=>{

//         if(err) return res.status(500).json(err);
//         console.log(delecom, "delecom")
//            res.json({delecom});
//     })
// })






router.get('/comment',(req,res,next)=>{
    Comment.find({},(err,comments)=>{
        console.log(comments, "comment")
        if(err) return res.status(500).json(err);
        res.json({comments})
    })
})


module.exports=router;