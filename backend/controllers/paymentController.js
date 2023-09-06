const Payment = require('../models/payment');
const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');

//get all the payments
const getPays = async (req,res) => {
    const payment = await Payment.find({}).sort({createdAt: -1});

    res.status(200).json(payment);
}


//get a single payments
const getPay = async (req, res) => {

    const { id } = req.params
  
    if (!mongooose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such payment' });
    }
  
    const payment = await Payment.findById(id);
  
  
  
    if (!payment) {
      return res.status(400).json({ error: 'No such payment' });
    }
  
    res.status(200).json(payment);
    
  };

  //create a new payment 

  const createPayment = async (req, res) => {
    const{cusName, address, contact, totalPrice} = req.body

    let emptyFields = []
    if(!cusName){
        emptyFields.push('cusName')

    }
    if(!address){
        emptyFields.push('address')

    }
    if(!contact){
        emptyFields.push('contact')

    }
    if(!totalPrice){
        emptyFields.push('totalPrice')

    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }

    try {

        const paymentDet = await Payment.creatingPayment(cusName, address, contact, totalPrice)
        console.log(paymentDet);
        res.status(200).json({paymentDet})
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }



  }

  module.exports = {
    createPayment,
    getPays,
    getPay,
  };