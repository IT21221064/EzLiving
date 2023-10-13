const express = require("express");
const Payment = require('../models/payment');
const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const Cart = require('../models/cart');
const Stripe = require("stripe");


require("dotenv").config();

const stripe = Stripe(process.env.STRIP_KEY)

const router = express.Router()


router.post('/create-checkout-session', async (req, res) => {

  /*const { id } = req.params
  
    if (!mongooose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such payment' });
    }
  
    const payment = await Payment.findById(id);
  
  
  
    if (!payment) {
      return res.status(400).json({ error: 'No such payment' });
    }
  
    res.status(200).json({
      cusName: payment.cusName,
      address: payment.address,
      contact: payment.contact,
      totalPrice: payment.totalPrice,

    });
  /*const line_items = req.body.payment(item => {
    return{
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: 1,

    }
  })*/
  const cartItems = await Cart.find();
  let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });


    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'lkr',
            product_data: {
              name: 'User',
            },
            unit_amount: totalPrice *100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/login',
      cancel_url: 'http://localhost:3000/cart',
    });
  
    res.send({url: session.url});
  });

  module.exports = router;