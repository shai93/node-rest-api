const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    type:mongoose.Schema.Types.ObjectId,
    grandtotal:{
        type:Number,
        required:true
    },
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
})

module.exports = mongoose.model('Order', orderSchema)