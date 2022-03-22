const sinon = require('sinon');
const {expect} = require('chai');

const connection = require('../../../models/connection');
const saleModel = require('../../../models/Sales'); 

describe('Lista todos as Sales do BD',() => {
    describe('Quando não existem Vendas no BD',() =>{
        before(()=>{
            const result = [[], []]

            sinon.stub(connection, 'execute').resolves(result);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array vazio ',async () => {
            const sale = await saleModel.getAll()

            expect(sale).to.be.an('array');
            expect(sale).to.be.empty;
        });
    })
    describe('Quando existem Vendas no BD',() =>{
        before(()=>{
            const sales = {
                id:1,
                name:'Martelo',
                quantity:10
            }
            const result = [[sales], []]

            sinon.stub(connection, 'execute').resolves(result);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array de objetos', async () => {
            const sale = await saleModel.getAll()

            expect(sale).to.be.an('array');
            expect(sale).not.to.be.empty;
            sale.forEach(p => expect(p).to.be.an('object'));
        });
        it('cada objeto no array deve ter as seguintes chaves "id","name","quantity"', async () => {
            const sale = await saleModel.getAll()

            expect(sale).not.to.be.empty;
            sale.forEach(p => expect(p).to.include.all.keys('id','name','quantity'));
        });
    })
});
describe('Lista Sales por ID',() => {
    before(async() => {
        const result = [{}]

        sinon.stub(connection,'execute').resolves(result);
    });
    after(async() => {
        connection.execute.restore();
    });

    describe('Quando não existe a Sale',()=>{
        it('retorna um array do objeto passado vazio',async () => {
            const sale = await saleModel.getById();

            expect(sale).to.be.a('object');
            expect(sale).to.be.empty;
        })
    });

    describe('Quando existe a Sale',()=>{
        before(() => {
            sinon.stub(saleModel,'getById').resolves({
                saleId:1,
                productId:2,
                quantity:10,
            })
        });
        after(() => {
            saleModel.getById.restore();
        });

        it('retorna um array com as chaves "saleId","productId" e "quantity"', async () => {
            const sale = await saleModel.getById(1);

            expect(sale).not.to.be.empty;
            expect(sale).to.includes.all.keys('saleId', 'productId', 'quantity');

        })
    });
});
describe('Gera a data em que a Sale foi criado',()=>{
    describe('Quando ocorreu com sucesso',() => {
        before(()=> {
           sinon.stub(connection,'execute').resolves([{insertId:1}])
        });
        after(() => {
            connection.execute.restore();
        });

        it('retorna o Objeto com ID e ele não pode estar vazio',async () => {
            const saleDate = await saleModel.createSale();

            expect(saleDate).to.be.a('number');
        });
    });
});
describe('Insere uma nova Sale no BD',() => {
    const fakeProduct = {
        productId:2,
        quantitiy:100,
    }
    before(() => {
        const newId = [{insertId:1}]

        sinon.stub(connection,'execute').resolves(newId);
    });
    after(() => {
        connection.execute.restore();
    });

    describe('Quando é inserido com sucesso no BD',() => {
        it('retorna um objeto',async () => {
            const product = await saleModel.createSaleProduct(fakeProduct);

            expect(product).not.to.be.empty;
            expect(product).to.be.a('object');
        });

        it('O objeto deve conter um "id" inserido',async () => {
            const product = await saleModel.createSaleProduct(fakeProduct);

            expect(product).not.to.be.empty;
            expect(product).to.have.a.property('insertId');
        });
    });
});
describe('Atualiza um Sale do BD',() => {
    const result = [{
        affectedRows: 1
      }, {
        "id": 4,
        "name": "test",
        "quantity": 5
      }]
    before(()=>{
        sinon.stub(connection , 'execute').resolves([{
            affectedRows: 1
        }]);
    });
    after(() =>{
        connection.execute.restore();
    });
    const id = 1;
    const name = 'test';
    const quantity = 5;

    it('recebe a key "affectedRows" que indica quantas linhas foram alteradas', async () => {
        const product = await saleModel.update(id,name,quantity)
        console.log(product);
        expect(product).to.be.deep.equal(result);
    });
});
describe('Deleta um produto do BD',() => {
    const sale = {
        saleId:1,
        productId:2,
        quantity:10,
    }

    before(() => {
        sinon.stub(connection,'execute').resolves([[],[]]);
    });
    after(() => {
        connection.execute.restore();
    });

    it('Deve retornar vazio', async () => {
        const result = await saleModel.exclude(sale.id);

        expect(result).to.be.equal(undefined);
    });
})