const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

describe('Busca os produtos no BD', () => {
  describe('Quando não encontra o id informado', ()=>{

    const resultExecute = [[]];
    const id = 5;

    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultExecute)
    })

    afterEach(() => {
      connection.execute.restore();
    })

    it('retorna undefined', async()=>{
      const result = await productModel.getProductId(id);
      console.log(result);
      expect(result).to.be.equal(undefined);
    });
  }); 

  describe('quando existe um ID correspondente', () => {
    const id = 1;
    const resultMock = [[
      {
        id: 1,
        name: "produto A",
        quantity: 10
      }
    ]];

    beforeEach(() => {
      sinon.stub(connection, 'execute')
      .resolves(resultMock);
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('retorna um objeto', async()=>{
      const result = await productModel.getProductId(id);
      expect(result).to.be.an('object');
    });

    it('o array não está vazio', async()=>{
      const result = await productModel.getProductId(id);
      expect(result).to.be.not.empty;
    });

    it('o objeto que esta no array contem os atributos id, name, quantity', async()=>{
      const result = await productModel.getProductId(id);
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    })
  });
});