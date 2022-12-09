const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');


router.get('/',async (req,res)=>{
    const productList= await  Product.find().populate('category');

    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
});
router.get('/:id',async (req,res)=>{
    const product= await  Product.findById(req.params.id).populate('category');

    if(!product){
        res.status(500).json({success:false})
    }
    res.send(product);
});
router.post('/',async(req,res)=>{  
const category = await Category.findById(req.body.category);
if(!category) return res.status(400).send('Invalid category !');

    const product = new Product({
        name : req.body.name, 
        Image : req.body.Image,
        countInStock : req.body.countInStock,
        price: req.body.price,
        description:req.body.description,
        category:req.body.category

    })
 

           if(!product)
              return res.status(500).send('The product cannot be created')

    res.send(product);
        
})
router.put('/:id',async(req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid category !');

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name : req.body.name,
            Image : req.body.Image,
            countInStock : req.body.countInStock,  
            price: req.body.price,
            description:req.body.description,
            category:req.body.category,
        },
        {new :true}
    )
    if(!product)
   return res.status(404).send('the product can not be created !')

   res.send(product);
})
router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({success:true,message:'the product is deleted !'})
        }else{ return res.status(404).json({success:false,message:'the product not found !'})}
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})
module.exports = router;
