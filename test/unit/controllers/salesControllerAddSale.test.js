const sinon = require("sinon");
const { expect } = require("chai");

const saleService = require("../../../services/saleService");
const saleController = require("../../../controllers/saleController");

describe("Ao chamar o controller de addSales", () => {
  describe("registra uma nova venda", async () => {

    const response = {};
    const request = {};

    let next = () => {};

    const bodyMock =   
    {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }
    beforeEach(() => {
      request.body =
    [
      {
        "productId": 1,
        "quantity": 3
      }
    ]

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sinon.stub();

      sinon.stub(saleService, "addSales").resolves(bodyMock);
    });

    afterEach(() => {
      saleService.addSales.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await saleController.addSales(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('o array possui objetos', async () => {
      const result = await saleController.addSales(request, response, next);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })
});