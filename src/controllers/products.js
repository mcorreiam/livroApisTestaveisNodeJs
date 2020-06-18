class ProductsController{
    get(req, res){
        return res.send([{
            name:'Default product',
            description:'product description',
            price: 100
        }])
    }
}

module.exports = ProductsController;