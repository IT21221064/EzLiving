const express = require('express');
const Payment = require('../models/payment')
const{
    createPayment,
    getPays,
    getPay,
    deletepayment,

}= require('../controllers/paymentController')

const router = express.Router()

//get a single payment 
router.get('/:id',getPay)

//get all payments
router.get('/',getPays)

//create payments
router.post('/',createPayment)

//get user payments
//router.get('/')

router.delete('/:id',deletepayment)

module.exports = router

