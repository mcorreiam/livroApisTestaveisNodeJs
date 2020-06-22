const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const Products = mongoose.model('Product', schema);
module.exports = Products;