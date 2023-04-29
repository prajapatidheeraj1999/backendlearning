const mongoose =require("mongoose")

const noteschema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    authorId:{type:String,required:true},
    authorName:{type:String,required:true},
    category:{type:String,required:true}
    
},{
    versionKey:false
})
const notemodel=mongoose.model("sutudentnote",noteschema)

module.exports={notemodel}