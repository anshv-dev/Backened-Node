const express = require('express')
const app = express()
const PORT=process.env.PORT||3000;
const db=require('./db')
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());

//Middleware Function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
  next();
}

app.use(logRequest)

app.get('/',(req, res) => {
  res.send('Hello World!')
})


//Import the router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuItemRoutes');
//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})