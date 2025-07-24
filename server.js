const express = require('express')
const app = express()
const PORT=process.env.PORT||3000;
const db=require('./db')
require('dotenv').config();
const passport=require('./auth')


const bodyParser=require('body-parser');
app.use(bodyParser.json());

//Middleware Function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
  next();
}

app.use(logRequest)



app.use(passport.initialize())

const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',localAuthMiddleware,(req, res) => {
  res.send('Hello World!')
})


//Import the router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuItemRoutes');
//Use the routers
app.use('/person',personRoutes);
app.use('/menu',localAuthMiddleware,menuRoutes);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})