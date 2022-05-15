const { expect } = require('chai');
const sinon = require('sinon');
const saleService = require('../../../services/saleService');
const saleModel = require('../../../models/saleModel');

describe('Busca as vendas no BD', () => {
  describe('quando não existe nenhum ID correspondente', () => {

    const resultMock = [[]];
    const id = 10;

    beforeEach(() => {
      sinon.stub(saleModel, 'getSaleId')
        .resolves(resultMock)
    })

    afterEach(() => {
      saleModel.getSaleId.restore();
    })

    it('retorna um array', async () => {
      const result = await saleService.getSaleId(id);
      expect(result).to.be.an('array');
    })

    it('retora um erro', async ()=>{
      try {
        await saleService.getSaleId(id);
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error).to.includes.all.keys('status', 'message');
      }
    });
  });

  describe('quando existem vendas registradas no BD', () => {

    const id = 1;

    const resultExecute = 
    [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]

    beforeEach(() => {
      sinon.stub(saleModel, 'getSaleId')
        .resolves(resultExecute)
    })

    afterEach(() => {
      saleModel.getSaleId.restore();
    })

    it('retorna um array', async () => {
      const result = await saleModel.getSaleId(id);
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await saleModel.getSaleId(id);
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await saleModel.getSaleId(id);
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos saleId, date, productId, quantity', async () => {
      const [result] = await saleModel.getSaleId(id);
      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity',
      )
    })
  })
})