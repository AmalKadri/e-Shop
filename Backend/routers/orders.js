const {Order} = require('../models/order');
const express = require('express');
const {OrderItem} = require('../models/order-item');
const router = express.Router();



router.get(`/`, async (req, res) =>{
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})
router.post('/',async(req,res)=>{ 

        const orderItemsIds = /*Promise.all*/(req.body.OrderItems?.map( async OrderItem=>{
            let newOrderItem = new OrderItem({
                quantity: OrderItem.quantity,
                product : OrderItem.product
            })
            
            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }))
        const OrderItemsResolved = await orderItemsIds;
       

    let  order= new Order({
     OrderItems :OrderItemsResolved, 
     Address:req.body.Address,
     city:req.body.city,
     phone:req.body.phone,
     totalPrice:req.body.totalPrice,
     user:req.body.user


    })
        order = await order.save();
 
    if(!order)
    return res.status(404).send('the order can not be created !')
 
    res.send(order);
 })

module.exports =router;