const sinon = require('sinon');
const {expect} = require('chai');

const connection = require('../../../models/connection');
const productModel = require('../../../models/Products'); 

describe('Lista todos os itens do BD',() => {
    describe('Quando não existem Produtos no BD',() =>{
        before(()=>{
            const result = [[], []]

            sinon.stub(connection, 'execute').resolves(result);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array vazio ',async () => {
            const product = await productModel.getAll()

            expect(product).to.be.an('array');
            expect(product).to.be.empty;
        });
    })
    describe('Quando existem Produtos no BD',() =>{
        before(()=>{
            const products = {
                id:1,
                name:'Martelo',
                quantity:10
            }
            const result = [[products], []]

            sinon.stub(connection, 'execute').resolves(result);
        });

        after(() => {
            connection.execute.restore();
        });

        it('retorna um array de objetos', async () => {
            const product = await productModel.getAll()

            expect(product).to.be.an('array');
            expect(product).not.to.be.empty;
            product.forEach(p => expect(p).to.be.an('object'));
        });
        it('cada objeto no array deve ter as seguintes chaves "id","name","quantity"', async () => {
            const product = await productModel.getAll()

            expect(product).not.to.be.empty;
            product.forEach(p => expect(p).to.include.all.keys('id','name','quantity'));
        });
    })
});
describe('Lista produtos por ID',() => {
    before(async() => {
        const result = [[{}]]

        sinon.stub(connection,'execute').resolves(result);
    });
    after(async() => {
        connection.execute.restore();
    });

    describe('Quando não existe o produto',()=>{
        it('retorna um array do objeto passado vazio',async () => {
            const product = await productModel.getById();

            expect(product).to.be.a('object');
            expect(product).to.be.empty;
        })
    });

    describe('Quando existe o produto',()=>{
        before(() => {
            sinon.stub(productModel,'getById').resolves({
                id:1,
                name:'Marreta Biônica',
                quantity:10,
            })
        });
        after(() => {
            productModel.getById.restore();
        });

        it('retorna um array com as chaves "id","name" e "quantity"', async () => {
            const product = await productModel.getById(1);

            expect(product).not.to.be.empty;
            expect(product).to.includes.all.keys('id','name','quantity');

        })
    });
});
describe('Insere um novo produto no BD',() => {
    const fakeProduct = {
        name:'Machado',
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
            const product = await productModel.create(fakeProduct);

            expect(product).not.to.be.empty;
            expect(product).to.be.a('object');
        });

        it('O objeto deve conter um "id" inserido',async () => {
            const product = await productModel.create(fakeProduct);

            expect(product).not.to.be.empty;
            expect(product).to.have.a.property('id');
        });
    });
});
describe('Atualiza um produto do BD',() => {
    const productObj = {
        id:1,
        name:"Martelo",
        quantity:10
    }
    before(()=>{
        sinon.stub(connection , 'execute').resolves(productObj);
    });
    after(() =>{
        connection.execute.restore();
    });
    it('Retorna um objeto com as keys usadas para atualizar no BD', async () => {
        
        const product = await productModel.update(1,'Martelo',10)

        expect(product).to.be.includes(productObj);
    });
});
describe('Deleta um produto do BD',() => {
    const product = {
        id:1,
        name:'Machado',
        quantity:10,
    }

    before(() => {
        sinon.stub(connection,'execute').resolves([[],[]]);
    });
    after(() => {
        connection.execute.restore();
    });

    it('Deve retornar vazio', async () => {
        const result = await productModel.deleteProduct(product.id);

        expect(result).to.be.equal(undefined);
    });
})