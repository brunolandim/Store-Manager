const ProductsModel = require('../models/Products');

const validationQuantityLength = async (req, res, next) => {
    const allProducts = await ProductsModel.getAll();
  
    const [resultMap] = req.body.map(({ productId, quantity }) => {
      const find = allProducts.find((e) => e.id === productId);
      
      return find.quantity - quantity;
    });
  
    if (resultMap < 0) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }
  
    next();
  };

module.exports = validationQuantityLength;