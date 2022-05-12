const { expect } = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

describe('Busca todos os filme no BD', () => {
  describe('quando não existe nenhum filme criado', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute)
    })

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await saleModel.getAllSales();
      expect(result).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const result = await saleModel.getAllSales();

      expect(result).to.be.empty;
    })
  });

  describe('quando existem filmes registrado no BD', () => {
    const resultExecute = [
      {
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
    ]

    beforeEach(() => {
      sinon.stub(connection, 'execute')
        .resolves([resultExecute])
    })

    afterEach(() => {
      connection.execute.restore();
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

    it('o objeto que esta no array contem os atributos saleId, date, productId, quantity ', async () => {
      const [result] = await saleModel.getAllSales();
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      )
    })
  })
})