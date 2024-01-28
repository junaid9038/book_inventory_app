import { body,validationResult } from "express-validator";



const  validateRequiest = async (req,res,next) =>{

//  // validate data
//  const { name, price, imageUrl } = req.body;
//  let errors = [];
//  if (!name || name.trim() == '') {
//    errors.push('Name is required');
//  }
//  if (!price || parseFloat(price) < 1) {
//    errors.push(
//      'Price must be a positive value'
//    );
//  }
//  try {
//    const validUrl = new URL(imageUrl);
//  } catch (err) {
//    errors.push('URL is invalid');
//  }

//exprss validater
//1.setup rules for calidation
const rules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({gt:0}).withMessage('price should be a positive value'),
    body('imageUrl').isURL().withMessage('Invalid url')
];

//2.run those rules.
await Promise.all(
    rules.map((rule) =>rule.run(req))
);

//3.check if there are any errors after running the rules.

var validationError = validationResult(req);

// 4. if error, return the error message
 if (!validationError.isEmpty()) {
   return res.render('new-product', {
     errorMessage: validationError.array()[0].msg,
   });
 }

 next();

}

export default validateRequiest;