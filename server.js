const express = require('express')
const app = express()
const port=3000
const db=require('./db')

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const Person=require('./models/Person')
const MenuItem=require('./models/MenuItem')
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.get('/chicken',(req,res)=>{
//   res.send('chicken le lo')
// })
// app.get('/idli',(req,res)=>{
//   res.send('idli le lo')
// })

// app.get('/items',(req,res)=>{
  
// })


//Post route to add a person
app.post('/person',async(req,res)=>{
    // const data=req.body 
    //Assuming the request body contains the person data

    //Create a new Person document using the Mongoose mode
    
    //Short-hand-way
    // const newPerson=new Person(data);
    /*newPerson.name=data.name;
    newPerson.age=data.age;*/
    
    //Save the new person to the database

    // this is like a callback function which will return something so, do not use this
    /*
    newPerson.save((error,savedperson)=>{
       if(error){
         console.log('Error saving person:',error)
         res.status(500).json({error:'Internal server error'})
        }else{
          console.log('data saved successfully');
          res.status(200).json(savedperson);
        }
    })
    */
    try{
      const data=req.body
      const newPerson=new Person(data);
      const response=await newPerson.save();
      console.log('data saved')
      res.status(200).json(response);
    
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
})


//Get method to get the person
app.get('/person',async(req,res)=>{
    try{
      const data=await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
})


//Post route for menuitem
app.post('/menu',async(req,res)=>{
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

//Get Route for menu
app.get('/menu',async(req,res)=>{
    try{
      const data=await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})