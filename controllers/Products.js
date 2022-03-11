const productsService = require('../services/Products');

const list = async (__req, res, next) => {
   try {
    const products = await productsService.getAll();
    
    res.status(200).json(products);
   } catch (e) {
       next(e);
   }
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const product = await productsService.getById(id);

        if (!product) return res.status(404).json({ message: 'Product not found' });
   
       return res.status(200).json(product);
    } catch (e) {
        next(e);
    }
}; 

module.exports = {
    list,
    getById,
};