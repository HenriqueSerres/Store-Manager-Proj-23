const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productService");
const productsController = require("../../../controllers/productController");

describe("Ao chamar o controller de addProductByName", () => {
  describe("registra um novo produto", async () => {
    const response = {};
    const request = {};
    let next = () => {};
    const bodyMock = {
      name: 'produto',
      quantity: 100 
    };
    beforeEach(() => {
      request.body = {
        name: 'produto',
        quantity: 100 
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub();

      sinon.stub(productsService, "addProductByName").resolves(bodyMock);
    });

    afterEach(() => {
      productsService.addProductByName.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await productsController.addProductByName(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('o array possui objetos', async () => {
      const result = await productsController.addProductByName(request, response, next);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })
});