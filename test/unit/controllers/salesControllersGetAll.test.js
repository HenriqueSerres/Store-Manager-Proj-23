const sinon = require('sinon');
const { expect } = require('chai');

const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');

describe('Chamada do controller getAllSales', () => {
  describe('quando existem vendas no banco de dados', async () => {
    const response = {};
    const request = {};

    const saleMock =[
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
    ];   

    beforeEach(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(saleService, 'getAllSales')
        .resolves(saleMock);
    })

    afterEach(() => {
      saleService.getAllSales.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await saleController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await saleController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

})