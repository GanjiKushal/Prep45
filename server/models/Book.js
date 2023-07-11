let mongoose=require('mongoose')
mongoose.pluralize(null)

let bookSchema=new mongoose.Schema({
    name:{type:String},
    author:{type:String}
}) 

let Book=mongoose.model("Book",bookSchema)
module.exports=Book