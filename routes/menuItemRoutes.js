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


//Creating PUT method
router.put('/:id',async(req,res)=>{
     try {
        const menuId=req.params.id; //Extract the id from the URL parameter
        const updatedmenuData=req.body;//Updated data for the person

        const response=await MenuItem.findByIdAndUpdate(menuId,updatedmenuData,{
           new:true, //Return the updated documents
           runValidators:true //Run Mongoose validation
         })


         if(!response){
            return res.status(404).json({error: 'Menu not found'})
         }
         console.log('data updated');
         res.status(200).json(response)
     } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
     }
})


//Creating DELETE method
router.delete('/:id',async(req,res)=>{
   try {
      const menuId=req.params.id;
      const response=await MenuItem.findByIdAndDelete(menuId);
      if(!response){
        return res.status(404).json({error:'Menu not found'});
      }
      console.log('data deleted');
         res.status(200).json({message: 'person deleted successfully'})
   } catch (error) {
     console.log(err);
     res.status(500).json({error:'Internal Server Error'})
   }
})
module.exports=router;
