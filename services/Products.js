const productsModel = require('../models/Products');

const getAll = async () => {
    const result = await productsModel.getAll();
    
    return result;
};

const getById = async (id) => {
    const result = await productsModel.getById(id);

    if (!result) return null;

    return result;
};

const create = async (name, quantity) => {
    const productAll = await productsModel.getAll();

    if (productAll.some((product) => product.name === name)) return false;

    const newProduct = await productsModel.create(name, quantity);

    return newProduct;
};

const updateProduct = async (id, name, quantity) => {
    const productUpdate = await productsModel.update(id, name, quantity);

    return productUpdate;
};

const deleteProductId = async (id) => {
    const deleteProduct = await productsModel.deleteProduct(id);
    
    if (!deleteProduct) return null;
    
    return deleteProduct;
};

const validationQuantityLength = async (req, res, next) => {
    const allProducts = await productsModel.getAll();
  
    const [resultMap] = req.body.map(({ productId, quantity }) => {
      const find = allProducts.find((e) => e.id === productId);
      
      return find.quantity - quantity;
    });
  
    if (resultMap < 0) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }
  
    next();
  };

module.exports = {
    getAll,
    getById,
    create,
    updateProduct,
    deleteProductId,
    validationQuantityLength,
};