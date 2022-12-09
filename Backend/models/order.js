const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
          
    }],
    Address:{
        type : String,
        required:true
    },
    city :{
        type :String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    totalPrice :{
        type:Number,
    },
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    dateOrder:{
        type :Date,
        default:Date.now,
    },
})

exports.Order = mongoose.model('Order', orderSchema);