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
const createSale = async () => {
    const [result] = await connection.execute(`
    INSERT INTO StoreManager.sales (date) VALUES(NOW());
    `);
    
    return result.insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
    const [result] = await connection.execute(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)Values(?,?,?) ;`,
    [saleId, productId, quantity]);

    return result;
};

const exclude = async (id) => {
    await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);
};

const update = async (saleId, productId, quantity) => {
    const [result] = await connection.execute(
        `
        UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?;
        `, [productId, quantity, saleId],
    );
        return result;
    };

module.exports = {
    getAll,
    getById,
    createSale,
    createSaleProduct,
    update,
    exclude,
};