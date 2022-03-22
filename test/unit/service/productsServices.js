const sinon = require('sinon')
const {expect} = require('chai')

const productModel = require('../../../models/Products');
const prodctService = require('../../../services/Products');

describe('Service getAll test',() => {
    before(()=>{
        sinon.stub(productModel,'getAll').resolves([])
    });
    after(() => {
        productModel.getAll.restore()
    })
    describe('Retorna um array', async () => {
        const products = await prodctService.getAll();

        expect(products).to.be.an('array')
    })
})
