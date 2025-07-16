const express = require('express')
const app = express()
const port=3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/chicken',(req,res)=>{
  res.send('chicken le lo')
})
app.get('/idli',(req,res)=>{
  res.send('idli le lo')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})