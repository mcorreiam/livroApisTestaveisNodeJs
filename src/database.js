const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/test';
const connect = () => mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const close = () => mongoose.close();

module.exports = {
    connect,
    connection: mongoose.connection 
}
