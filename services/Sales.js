const salesModel = require('../models/Sales');

const getAll = async () => {
    const result = await salesModel.getAll();
    
    return result;
};

const getById = async (id) => {
    const result = await salesModel.getById(id);
    
    if (!result) return null;

    return result;
};

const create = async (name, quantity) => {
    const result = await salesModel.create(name, quantity);

    if (!result) return null;
    
    return result;
};

module.exports = {
    getAll,
    getById,
    create,
};