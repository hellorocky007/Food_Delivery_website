const express = require('express');
const mongoDB = require('./database');
const app = express();
mongoDB();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3001");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(express.json());
app.use('/api',require("./Routes/createUser"));
app.use('/api',require("./Routes/displayData"));
app.use('/api',require("./Routes/Order_Data"));



app.listen(3000,()=>{
    console.log("Sever connect succesfull at port 3000");
});
app.get('/', (req, res) => {
  res.send('hello world')
})