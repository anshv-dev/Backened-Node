const mongoose=require('mongoose')
require('dotenv').config();

//Define the MongoDB connection URL
/*const mongoURL='mongodb://localhost:27017/hotels' */ //Replace 'mydatabase' with your database name
// const mongoURL='mongodb+srv://anshv8166:<dbpassword>@cluster0.bwaa7ld.mongodb.net/'

// const mongoURL=process.env.MONGODB_URL;
const mongoURL=process.env.MONGODB_URL_LOCAL
//Set up MongoDB connections
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db=mongoose.connection

//Define event listeners for database connection
db.on('connected',()=>{
     console.log('Connected to MongoDB server') 
})


db.on('error',(err)=>{
  console.log('MongoDB connection error:',err);
})

db.on('disconnected',()=>{
   console.log('MongoDB disconnected')
})


//Export database connection
module.exports=db