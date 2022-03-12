const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute(`SELECT sProducts.sale_id as saleId,sale.date,
sProducts.product_id as productId,sProducts.quantity 
FROM StoreManager.sales_products as sProducts
INNER JOIN StoreManager.sales as sale
ON sProducts.sale_id = sale.id`);

    return result;
};

const getById = async (id) => {
    const [result] = await connection.execute(`
SELECT sale.date, saleProduct.product_id as productId,saleProduct.quantity
FROM StoreManager.sales_products as saleProduct
INNER JOIN StoreManager.sales as sale
ON saleProduct.sale_id = sale.id
WHERE sale_id = ?`, [id]);

    return result;
};

const create = async (name, quantity) => {
    const [result] = await connection.execute(`
    INSERT INTO StoreManager.products(name,quantity)Values(?,?) ;`,
    [name, quantity]);

    const newObj = {
        id: result.insertId,
        name,
        quantity,
    };
    return newObj;
};

module.exports = {
    getAll,
    getById,
    create,
};