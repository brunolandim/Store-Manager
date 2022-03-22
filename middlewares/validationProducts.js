const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
       return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    next();
};

const validateQuantity = (req, res, next) => {
    const { quantity } = req.body;
    if (!quantity && typeof quantity !== 'number') { 
        return res.status(400).json({ message: '"quantity" is required' }); 
}
    if (quantity <= 0) {
       return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
};
module.exports = {
    validateName,
    validateQuantity,
};