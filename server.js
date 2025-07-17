const express = require('express')
const app = express()
const port=3000
const db=require('./db')

const bodyParser=require('body-parser');
app.use(bodyParser.json());

// const Person=require('./models/Person')
// const MenuItem=require('./models/MenuItem')
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//Import the router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuItemRoutes');
//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})