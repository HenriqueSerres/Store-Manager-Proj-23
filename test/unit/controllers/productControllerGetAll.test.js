const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');

describe('Chamada do controller getAllProducts', () => {
  describe('quando existem filmes no banco de dados', async () => {
    const response = {};
    const request = {};

    const productMock =[
      {
        id: 1,
        name: 'Product A',
        quantity: 10,
      }
    ];   

    beforeEach(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productService, 'getAllProducts')
        .resolves(productMock);
    })

    afterEach(() => {
      productService.getAllProducts.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

})