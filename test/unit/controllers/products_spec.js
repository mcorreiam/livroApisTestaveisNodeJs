const ProductsController = require('../../../src/controllers/products')
const sinon = require('sinon');
const Product = require('../../../src/models/products');

describe('Controller: Products', ()=>{
    const defaultProduct = [
        {
            name:'Default product',
            description:'product description',
            price: 100
        }
    ];

    const defaultRequest = {
        params: {}
    }

    describe('get() products', ()=>{
        it('should return a list of products', async ()=>{
            const response = {
                send: sinon.spy()
            };

            Product.find = sinon.stub();
            Product.find.withArgs({}).resolves(defaultProduct);

            const productsController = new ProductsController(Product);
            await productsController.get(defaultRequest, response);
            sinon.assert.calledWith(response.send, defaultProduct);
        })

        it('shoud return 400 when an error occurs', async() => {
            const request = {};
            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };

            response.status.withArgs(400).returns(response);
            Product.find = sinon.stub();
            Product.find.withArgs({}).rejects({message: 'Error'});

            const productsController = new ProductsController(Product);
            await productsController.get(request, response);
            sinon.assert.calledWith(response.send, 'Error');
        })
    })

    describe('getById()', () => {
        it('should return one product', async () => {
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id:fakeId
                }
            };
            const response = {
                send: sinon.spy()
            };

            Product.find = sinon.stub();
            Product.find.withArgs({ _id: fakeId }).resolves(defaultProduct);

            const productsController = new ProductsController(Product);
            await productsController.getById(request, response);

            sinon.assert.calledWith(response.send, defaultProduct);
        });
    });
})