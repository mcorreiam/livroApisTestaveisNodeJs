const mongoose = require('mongoose');
const config = require('config');

const mongodbUrl = config.get('database.mongoUrl');
const connect = () => mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const close = () => mongoose.close();

module.exports = {
    connect,
    connection: mongoose.connection 
}
