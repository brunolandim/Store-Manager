require('dotenv').config();
const express = require('express');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/products', Products.list);
app.get('/products/:id', Products.getById);

app.get('/sales', Sales.list);
app.get('/sales/:id', Sales.getById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
