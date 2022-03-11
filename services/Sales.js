const salesModel = require('../models/Sales');

const getAll = async () => {
    const result = await salesModel.getAll();
    
    return result;
};

const getById = async (id) => {
    const result = await salesModel.getById(id);
    
    if (!result || result.length === 0) return null;

    return result;
};

module.exports = {
    getAll,
    getById,
};