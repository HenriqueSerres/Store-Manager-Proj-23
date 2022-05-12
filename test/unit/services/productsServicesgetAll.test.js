const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

describe('Busca todos os produtos no BD', () => {
  describe('quando não existe nenhum produto criado', () => {

    beforeEach(() => {
      sinon.stub(productModel, 'getAllProducts')
        .resolves([])
    })

    afterEach(() => {
      productModel.getAllProducts.restore();
    })

    it('retorna um array', async () => {
      const result = await productService.getAllProducts();
      expect(result).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const result = await productService.getAllProducts();

      expect(result).to.be.empty;
    })
  });

  describe('quando existem produtos registrado no BD', () => {
    const resultExecute = [
      {
        id: 1,
        name: 'produto A',
        quantity: 10,
      }
    ]

    beforeEach(() => {
      sinon.stub(productModel, 'getAllProducts')
        .resolves(resultExecute)
    })

    afterEach(() => {
      productModel.getAllProducts.restore();
    })

    it('retorna um array', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await productModel.getAllProducts();
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await productModel.getAllProducts();
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
      const [result] = await productModel.getAllProducts();
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      )
    })
  })
})