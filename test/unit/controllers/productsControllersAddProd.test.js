const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productService");
const productsController = require("../../../controllers/productController");

describe("Ao chamar o controller de addProductByName", () => {
  describe("quando o name informado já", async () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productsService, "addProductByName").resolves(false);
    });

    after(() => {
      productsService.create.restore();
    });

    it("é chamado o status com o código 409", async () => {
      await productsController.addProductByName(request, response);

      expect(response.status.calledWith(409)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Product already exists"', async () => {
      await productsController.addProductByName(request, response);

      expect(response.send.calledWith("Product already exists")).to.be.equal(true);
    });
  });

  describe("quando é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        id: 1,
        name: "product A",
        quantity: 10,
      };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productsService, "addProductByName").resolves(true);
    });

    after(() => {
      productsService.create.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await productsController.addProductByName(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna um array', async () => {
      const result = await productModel.getAllProducts(request, response);
      expect(result).to.be.an('array');
    })

    it('o array não esta vazio', async () => {
      const result = await productModel.getAllProducts(request, response);
      expect(result).to.be.not.empty;
    })

    it('o array possui objetos', async () => {
      const [result] = await productModel.getAllProducts(request, response);
      expect(result).to.be.an('object');
    })

    it('o objeto que esta no array contem os atributos id, name, quantity', async () => {
      const [result] = await productModel.getAllProducts(request, response);
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity',
      )
    })
  })
});
