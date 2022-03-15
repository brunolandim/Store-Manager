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

const deleteProductId = async (id) => {
    const deleteProduct = await productsModel.deleteProduct(id);
    
    if (!deleteProduct) return null;
    
    return deleteProduct;
};

module.exports = {
    getAll,
    getById,
    create,
    deleteProductId,
};