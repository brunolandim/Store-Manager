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