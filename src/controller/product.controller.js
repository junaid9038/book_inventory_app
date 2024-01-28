import path from 'path'
import ProductModel from '../models/product.model.js';

// use here ES6 module


class ProductController{
    getProducts(req, res, next) {
        var products = ProductModel.get();
        res.render('products', { products });
    }

    getAddProduct(req, res, next) {
        res.render('new-product', {
          errorMessage: null,
        });
   }

      postAddProduct(req, res, next) {
        ProductModel.add(req.body);
        var products = ProductModel.get();
        res.render('products', { products });
      }
     
      getUpdateProductView(req,res,next){
     //   1. if product exist then return view
     const id = req.params.id;
     const productfound = ProductModel.getbyId(id);
     if(productfound){
       res.render('update-product',{product:productfound,errorMessage:null});
     }
     //  2.  else return error.  
     else{
        res.status(401).send('Product not found');
     }

      }

     postUpdateProductview(req,res){
        ProductModel.update(req.body);
        var products = ProductModel.get();
        res.render('products', { products });
     } 

     deleteProduct(req,res){
        const id = req.params.id;
        const productfound = ProductModel.getbyId(id);
     if(!productfound){
       return res.status(401).send('Product not found');
     }
      ProductModel.delete(id);
      var products = ProductModel.get();
        res.render('products', { products });

     }

}

export default ProductController;


// export default class ProductController{

//     // getProducts(req,res){
//     //     let products = ProductModel.get()
//     //     console.log(products);
//     //     res.render("products",{products:products})
//     //     // return res.sendFile(

//     //     //     path.join(path.resolve(),'src','views','products.html')

//     //     // )
//     // }
     
//     // this controller for new product form. 
//     getAddForm(req,res){
//        return res.render("new-product"); // here not returning any data
//     }

//     // this controller for add new product.
//     addNewProduct(req,res){
//         // access data from form.
//         console.log(req.body)// undefine
//         ProductModel.add(req.body)
//         let products = ProductModel.get()
//         return res.render("products",{products});
//     //     return res.send();
//      }


// }