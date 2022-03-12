require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');
const { validateName, validateQuantity } = require('./middlewares/validationProducts');
const { validadeProductIdSale, validadeQuantitySale } = require('./middlewares/validationSale');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/products', Products.list);
app.get('/products/:id', Products.getById);
app.post('/products', validateName, validateQuantity);
app.put('/products/:id', validateName, validateQuantity);

app.get('/sales', Sales.list);
app.get('/sales/:id', Sales.getById);
app.post('/sales', validadeProductIdSale, validadeQuantitySale);
app.put('/sales/:id', validadeProductIdSale, validadeQuantitySale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
