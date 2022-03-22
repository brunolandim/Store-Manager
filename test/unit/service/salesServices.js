const sinon = require('sinon')
const {expect} = require('chai')

const saleModel = require('../../../models/Sales');
const saleService = require('../../../services/Sales');

describe('Service getAll test',() => {
    before(()=>{
        sinon.stub(saleModel,'getAll').resolves([])
    });
    after(() => {
        saleModel.getAll.restore()
    })
    describe('Retorna um array', async () => {
        const products = await saleService.getAll();

        expect(products).to.be.an('array')
    })
})