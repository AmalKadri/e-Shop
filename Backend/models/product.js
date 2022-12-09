const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name :{
      type : String,
      requires : true
    } ,
    description :{
        type: String,
        required:true
    },
    Image : String,
    
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
          
    },
    countInStock : {
        type : Number,
        required : true,
        min:0,
        max:100
    }
})

exports.Product = mongoose.model('Product',productSchema); 