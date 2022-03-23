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

const createSaleService = (products) => salesModel.createSale().then((id) => {
    products.forEach(({ productId, quantity }) => {
      salesModel.createSaleProduct(id, productId, quantity);
    });
    return {
      id,
      itemsSold: products,
    };
  });

const updateSale = async (saleId, productId, quantity) => {
    const saleUpdate = await salesModel.update(saleId, productId, quantity);

    return saleUpdate;
};

const excludeSale = async (id) => {
    const result = await salesModel.exclude(id);

    if (!result) return null;

    return result;
};

module.exports = {
    getAll,
    getById,
    updateSale,
    createSaleService,
    excludeSale,
};