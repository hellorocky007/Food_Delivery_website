const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');

router.post("/orderData",async (req,res)=>{
    try {
        let data = req.body.order_data;
        data.splice(0, 0, { Order_date: req.body.order_date });
    
        let existingOrder = await Order.findOne({ 'email': req.body.email });
    
        if (existingOrder === null) {
            // If the order with the given email doesn't exist, create a new one
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // If the order with the given email exists, update it by pushing the new data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
    
})

router.post("/myOrderData",async(req,res)=>{
    try{
        let myData = await Order.findOne({'email':req.body.email});
        res.json({orderData:myData})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
})

module.exports = router;