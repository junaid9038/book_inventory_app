import express from 'express';
import ProductController from './src/controller/product.controller.js'
import ejsLayouts from 'express-ejs-layouts';
import path from 'path'
import validationMiddlewares from './src/middlewares/validation.middlewares.js';


// const express = require('express');
const server = express();

server.use(express.static('public'));

//parse form data - we need ot basically instruct our express server that please use this encoding formate
// this is middleware.
server.use(express.urlencoded({extended:true}));

//setup view engine setting
server.set('view engine','ejs')
server.set('views', path.join(path.resolve(),'src','views'))

//layouts
server.use(ejsLayouts);

//create an instance of ProductController 
const productController = new ProductController()

server.get('/',productController.getProducts);
server.get('/new',productController.getAddProduct);
server.post('/',validationMiddlewares,productController.postAddProduct);
server.get('/update-product/:id',productController.getUpdateProductView);
server.post('/delete-product/:id',productController.deleteProduct)
server.post('/update-product',productController.postUpdateProductview);

server.use(express.static('src/views'))

// server.get('/',(req,res) => {
//     return res.send('Welcome to Inventory App');
// })

server.listen(3400);