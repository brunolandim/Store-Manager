const SaleService = require('../services/Sales');

const list = async (__req, res, next) => {
   try {
    const Sales = await SaleService.getAll();
    
    res.status(200).json(Sales);
   } catch (e) {
       next(e);
   }
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const Sale = await SaleService.getById(id);

        if (!Sale || Sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
        
        return res.status(200).json(Sale);
    } catch (e) {
        next(e);
    }
};

const createSale = async (req, res, next) => {
    const { name, quantity } = req.body;
    try {
        const newSale = await SaleService.create(name, quantity);

        return res.status(200).json(newSale);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    list,
    getById,
    createSale,
};