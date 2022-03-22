const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/Products')
const productsService = require('../../../services/Products');

describe('Ao chamar o controller list', () => {
    let request = {},response = {},next = {}
    describe('Quando não existem produtos cadastrados na base', () => {
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(productsService ,'getAll').resolves([]) 
        });
        after(() => {
            productsService.getAll.restore();
        });

        it('responde a requisição com status 200',async () => {
            await productController.list(request,response,next);

            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('responde a requisição com array vazio',async () => {
            await productController.list(request,response,next);

            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true)
        });
    });

    describe('Quando ocorre erro no serviço', () => {
        const err = Error('erro no serviço');
        before(() => {
            next = sinon.stub()
            sinon.stub(productsService,'getAll').throws(err)
        });
        after(()=>{
            productsService.getAll.restore();
        });

        it('O erro é passado para o proximo Handler de erro na lista de handlers',async() => {
            await productController.list(request,response,next);

            expect(next.calledWith(sinon.match(err))).to.be.equal(true);
        });
    });
});
describe('Ao chamar o controller getById', () => {
    let request = {},response = {},next = {}
    describe('Quando existem ou não produtos cadastrados na base',() => {
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            request.params = {
                id: 1
            }
            sinon.stub(productsService,'getById').resolves(1)
        });
        after(() => {
            productsService.getById.restore();
        });
        it('responde a requisição com status 200',async () => {
           await productController.getById(request,response,next);

           expect(response.status.calledWith(200)).to.be.equal(true)
        });
    })
    describe('Quando Id é passado vazio retorna 404 e mensagem de erro "Product not Found"',  () => {
        before(() => {
            sinon.stub(productsService,'getById').resolves(null)
        });
        after(() => {
            productsService.getById.restore();
        });
        it('responde com erro no',async()=>{
            await productController.getById(request,response,next);

            expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true)
        });
    })
    describe('Quando ocorre erro no serviço', () => {
        const err = Error('erro no serviço');
        before(() => {
            next = sinon.stub()
            sinon.stub(productsService,'getById').throws(err)
        });
        after(()=>{
            productsService.getById.restore();
        });

        it('O erro é passado para o proximo Handler de erro na lista de handlers',async() => {
            await productController.getById(request,response,next);

            expect(next.calledWith(sinon.match(err))).to.be.equal(true);
        });
    });
});
describe('Ao chamar o controller de createProduct',() => {
    let request = {},response = {},next = {}
    describe('Quando produto é criado com sucesso',() =>{
        const InsertProduct = {
            id: 5,
            name: 'Martelo de Thor',
            quantity: 5,
          };
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            request.body = {
                name: 'Martelo de Thor',
                quantity: 5,
              };
        
            sinon.stub(productsService,'create').resolves(InsertProduct)
        });
        after(() => {
            productsService.create.restore();
        });
        it('A requisição responde com status 200',async () => {
            await productController.createProduct(request,response,next);

            expect(response.json.calledWith(InsertProduct)).to.be.equal(true);
        });
    })
    describe('Quando ocorre erro nos parametros passados na request',() =>{
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();
            request.body = {
                name:'Martelo',
                quantity:10
            }
            sinon.stub(productsService,'create').resolves(false);
        });
        after(() => {
            productsService.create.restore();
        });
        it('retorna um erro com a mensagem "Product already exists" e status 409',async () => {
            await productController.createProduct(request,response);

            expect(response.json.calledWith({message:'Product already exists'})).to.be.equal(true);
        });
    })
    describe('Quando ocorre erro no serviço', () => {
        const err = Error('erro no serviço');
        before(() => {
            next = sinon.stub()
            sinon.stub(productsService,'create').throws(err)
        });
        after(()=>{
            productsService.create.restore();
        });

        it('O erro é passado para o proximo Handler de erro na lista de handlers',async() => {
            await productController.createProduct(request,response,next);

            expect(next.calledWith(sinon.match(err))).to.be.equal(true);
        });
    });
})