const fs = require('fs');
const express = require('express');
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const server = express() ; 
const morgan = require("morgan");
const { connected } = require('process');
server.use(express.json());

// PRODUCTS 
// BASE URL AUR API ROOT 
// This is Basically google.com/api/v1 
// These are Updated after certain time 

server.get('/products' ,  (req, res) =>{
  res.json(products)
})

// READING A SPECIFIED OBJECT 
server.get('/products/:id' ,  (req, res) =>{
  const id = +(req.params.id)

 const product =  products.find(p=>p.id === id )
  res.json(product)
})

// CREATE A POST 
server.post('/products' , (req, res) =>{
  console.log(req.body)
  products.push(req.body)
  res.json(req.body)
})


// UPDATE OR PUT OPERATIONS 
server.put('/products/:id' ,  (req, res) =>{
  const id = +(req.params.id)

 const productIndex =  products.findIndex(p=>p.id === id )
 products.splice(productIndex , 1 , {...req.body , id: id })
  res.status(201).json();

})

server.patch('/products/:id' ,  (req, res) =>{
  const id = +(req.params.id)

 const productIndex =  products.findIndex(p=>p.id === id )
 const product = products[productIndex];
 products.splice(productIndex , 1 , {...product , ...req.body })
  res.status(201).json();

})

// DELETE API 
server.delete('/products/:id' ,  (req, res) =>{
  const id = +(req.params.id)

 const productIndex =  products.findIndex(p=>p.id === id )
 const product = products[productIndex];
 products.splice(productIndex , 1 )
  res.status(201).json(product);

})






server.listen(8080 , ()=>{
  console.log("Server Started")
})


