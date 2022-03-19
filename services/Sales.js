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

const createSaleService = async (sales) => {
    const saleId = await salesModel.createSale();

    if (!saleId) return null;

    sales.forEach(async (sale) => {
        await salesModel.createSaleProduct(saleId, sale.productId, sale.quantity);
    });

    return {
        id: saleId,
        itemsSold: sales,
    };
};

const excludeSale = async (id) => {
    const result = await salesModel.exclude(id);

    if (!result) return null;

    return result;
};

module.exports = {
    getAll,
    getById,
    createSaleService,
    excludeSale,
};