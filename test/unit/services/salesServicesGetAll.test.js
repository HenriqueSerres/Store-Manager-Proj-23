const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../services/saleService');
const saleModel = require('../../../models/saleModel');

describe('Busca todos as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', () => {

    beforeEach(() => {
      sinon.stub(saleModel, 'getAllSales')
        .resolves([])
    })

    afterEach(() => {
      saleModel.getAllSales.restore();
    })

    it('retorna um array', async () => {
      const result = await saleService.getAllSales();
      expect(result).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const result = await saleService.getAllSales();

      expect(result).to.be.empty;
    })
  });

  describe('quando existem vendas registradas no BD', () => {
    const resultExecute = [
      {
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2
      }
    ];

    beforeEach(() => {
      sinon.stub(saleModel, 'getAllSales')
        .resolves(resultExecute)
    })

    afterEach(() => {
      saleModel.getAllSales.restore();
    })

    it('retorna um array', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await saleModel.getAllSales();
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos saleId, date, prductId, quantity', async () => {
      const [result] = await saleModel.getAllSales();
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity',
      )
    })
  })
})