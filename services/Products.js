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
    const result = await productsModel.create(name, quantity);

    if (!name || !quantity) return null;

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
};