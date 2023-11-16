const fs = require('fs');
const express = require('express');
const server = express() ; 
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;
const morgan = require("morgan")
server.use(express.json());
// Earlier it was the BODY PARSER -- UNDERSTANDS THE BODY 
// This is Used to Just Read the Properties of Body in JSON 

server.use(morgan('dev'))


// API - END POINT -- ROUTE 



server.use((req , res , next) =>{
  console.log(req.method , req.ip, req.hostname )
  next() ; 
})

const auth  = (req  , res , next) =>{
  if(req.body.password == '123' ) {
    next() ; 

  }
  else {
    console.log("Unauthoriused")
    res.sendStatus(401);

  }
}
server.get('/product/:id' ,   (req, res) =>{
  console.log("This is Executing ")
  console.log(req.params)
  res.json({type:'GET'})
})

server.get('/' , auth,  (req, res) =>{
  res.json({type:'GET'})
})
server.post('/' , (req, res) =>{
  res.json({type:'POST'})
})

server.delete('/' , (req, res) =>{
  res.json({type:'DELETE'})
})

server.patch('/' , (req, res) =>{
  res.json({type:'PATCH'})
})


server.get('/demo', (req, res) => {

  // res.sendStatus(402)
 // res.json(products)
  //res.sendFile('/Users/91966/Desktop/NODE_CODER/node-3/index.html');
});



server.listen(8080 , ()=>{
  console.log("Server Started")
})


