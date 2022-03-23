const sinon = require('sinon');
const { expect } = require('chai');

const saleController = require('../../../controllers/Sales')
const saleService = require('../../../services/Sales');

describe('Ao chamar o controller list', () => {
    let request = {},response = {},next = {}
    describe('Quando não existem Sales cadastrados na base', () => {
        before(() => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub().returns();

            sinon.stub(saleService ,'getAll').resolves([]) 
        });
        after(() => {
            saleService.getAll.restore();
        });

        it('responde a requisição com status 200',async () => {
            await saleController.list(request,response,next);

            expect(response.status.calledWith(200)).to.be.equal(true);
        });

        it('responde a requisição com array vazio',async () => {
            await saleController.list(request,response,next);

            expect(response.json.calledWith(sinon.match.array)).to.be.equal(true)
        });
    });

    describe('Quando ocorre erro no serviço', () => {
        const err = Error('erro no serviço');
        before(() => {
            next = sinon.stub()
            sinon.stub(saleService,'getAll').throws(err)
        });
        after(()=>{
            saleService.getAll.restore();
        });

        it('O erro é passado para o proximo Handler de erro na lista de handlers',async() => {
            await saleController.list(request,response,next);

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
            sinon.stub(saleService,'getById').resolves(1)
        });
        after(() => {
            saleService.getById.restore();
        });
        it('responde a requisição com status 200',async () => {
           await saleController.getById(request,response,next);

           expect(response.status.calledWith(200)).to.be.equal(true)
        });
    })
    describe('Quando Id é passado vazio retorna 404 e mensagem de erro "Product not Found"',  () => {
        before(() => {
            sinon.stub(saleService,'getById').resolves(null)
        });
        after(() => {
            saleService.getById.restore();
        });
        it('responde com erro no',async()=>{
            await saleController.getById(request,response,next);

            expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true)
        });
    })
    describe('Quando ocorre erro no serviço', () => {
        const err = Error('erro no serviço');
        before(() => {
            next = sinon.stub()
            sinon.stub(saleService,'getById').throws(err)
        });
        after(()=>{
            saleService.getById.restore();
        });

        it('O erro é passado para o proximo Handler de erro na lista de handlers',async() => {
            await saleController.getById(request,response,next);

            expect(next.calledWith(sinon.match(err))).to.be.equal(true);
        });
    });
});
describe('Ao chamar o controller de createSaleServiceSale',() => {
    let request = {}, response = {}, next = {};
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
        
            sinon.stub(saleService,'createSaleService').resolves(InsertProduct)
        });
        after(() => {
            saleService.createSaleService.restore();
        });
        it('A requisição responde com status 200',async () => {
            await saleController.createSale(request,response);
            
            expect(response.json.calledWith(InsertProduct)).to.be.equal(true);
        });
    })
    describe('Quando ocorre erro no serviço', () => {
        const err = Error('erro no serviço');
        before(() => {
            next = sinon.stub();
            sinon.stub(saleService,'createSaleService').throws(err)
        });
        after(()=>{
            saleService.createSaleService.restore();
        });

        it('O erro é passado para o proximo Handler de erro na lista de handlers',async() => {
            await saleController.createSale(request,response,next);

            expect(next.calledWith(sinon.match(err))).to.be.equal(true);
        });
    });
})