const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

describe('Busca os produtos no BD', () => {
  describe('quando não existe nenhum ID correspondente', () => {

    const resultMock = [[]];
    const id = 10;

    beforeEach(() => {
      sinon.stub(productModel, 'getProductId')
        .resolves(resultMock)
    })

    afterEach(() => {
      productModel.getProductId.restore();
    })

    it('retorna um array', async () => {
      const result = await productService.getProductId(id);
      expect(result).to.be.an('array');
    })

    it('retora um erro', async ()=>{
      try {
        await productService.getProductId(id);
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.includes.all.keys('status', 'message');
      }
    });
  });

  describe('quando existem produtos registrado no BD', () => {

    const id = 1;

    const resultExecute = 
      {
        id: 1,
        name: 'produto A',
        quantity: 10,
      }

    beforeEach(() => {
      sinon.stub(productModel, 'getProductId')
        .resolves(resultExecute)
    })

    afterEach(() => {
      productModel.getProductId.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getProductId(id);
      expect(result).to.be.an('object');
    })

    it('o array não esta vazio', async () => {
      const result = await productModel.getProductId(id);
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const result = await productModel.getProductId(id);
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
      const result = await productModel.getProductId(id);
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      )
    })
  })
})