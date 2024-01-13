const mongoose=require('mongoose')

const Schema= mongoose.Schema

const paymentSchema=new Schema({

    amount:{
        type:Number,
        required:true
    },
    slip:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports=mongoose.model('payments',paymentSchema)