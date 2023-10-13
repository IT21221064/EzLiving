const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    cusName: {
        type:String,
        required : true
    },
    address:{
        type:String,
        required : true
    },
    contact:{
        type:Number,
        required : true
    },
    totalPrice:{
        type:Number,
        required : true
    }
},{timestamps:true}

)

PaymentSchema.statics.creatingPayment = async function(cusName,address,contact,totalPrice)  {
    const payment = await this.create({cusName,address,contact,totalPrice})
        return payment
    
    }

module.exports = mongoose.model('Payment', PaymentSchema)