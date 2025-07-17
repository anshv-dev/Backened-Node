const express=require('express');
const router=express.Router();
const MenuItem = require('./../models/MenuItem');

//POST route to add a menu
router.post('/',async(req,res)=>{
     try{
      const data=req.body
      const newMenu=new MenuItem(data);
      const response=await newMenu.save();
      console.log('data saved')
      res.status(200).json(response);
    
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
})

//Get method to get the person
router.get('/',async(req,res)=>{
    try{
      const data=await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
})


//Creating Worktype GET route
router.get('/:type',async(req,res)=>{
    try {
      const tasteType=req.params.type;  //Extract the taste type from the URL parameter
    if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour'){
      const response=await MenuItem.find({taste:tasteType});
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error:'Invalid work type'})
    }
    } catch (error) {
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
})

module.exports=router;
