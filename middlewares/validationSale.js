const validadeProductIdSale = (req, res, next) => {
    const { productId } = req.body[0];

    if (!productId)res.status(400).json({ message: '"productId" is required' });

    next();
};
const validadeQuantitySale = (req, res, next) => {
    const { quantity } = req.body[0];

    if (!quantity)res.status(400).json({ message: '"quantity" is required' });
    if (quantity <= 0) {
        return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
};

module.exports = {
    validadeProductIdSale,
    validadeQuantitySale,
};