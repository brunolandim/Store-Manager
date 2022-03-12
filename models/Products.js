const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM StoreManager.products;');

    return result;
};

const getById = async (id) => {
    const [result] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?;',
    [id]);

    return result[0];
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