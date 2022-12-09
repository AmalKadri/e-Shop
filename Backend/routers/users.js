const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('name email passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    }  
    res.send(userList);
})
router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id).select('name email passwordHash');

    if(!user) {
        res.status(500).json({message:'the category with the given ID was not found !'})
    }  
    res.status(200).send(user);
})
 
//register
router.post('/',async(req,res)=>{ 
    let  user= new User({
     name :req.body.name,
     email:req.body.email,
     passwordHash:bcrypt.hashSync(req.body.password,10),
     phone:req.body.phone, 
     isAdmin:req.body.isAdmin,
     street:req.body.street,
     apartment:req.body.apartment,
     city:req.body.city,
     country:req.body.country



    })
         user = await user.save();
 
    if(!user)
    return res.status(404).send('the user can not be created !')
 
    res.send(user);
 })

 //login with token
 router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    const secret='im-happy';

    if(!user){
        return res.status(400).send('The user not found !')
    }

    if(user && bcrypt.compareSync(req.body.password , user.passwordHash)) {

        const token =jwt.sign(
            {
                userId:user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {
                expiresIn : '1d'
            }
        )
        res.status(200).send({user:user.email,token:token})
    }else {
        res.status(400).send('Password is wrong !')  
    } 
      
 })

 router.delete('/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id).then(user=>{
        if(user){
            return res.status(200).json({success:true,message:'the user is deleted !'})
        }else{ return res.status(404).json({success:false,message:'the user not found !'})}
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})
   
module.exports =router;