const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const database = require('./database');
const acl = require('express-acl');
const authMiddleware = require('./middlewares/auth')

const app = express();

acl.config({
    baseUrl: '/',
    path: 'config'
})

const configureExpress = () =>{
    app.use(bodyParser.json());
    app.use(authMiddleware);
    app.use(acl.authorize.unless({path:['/users/authenticate']}))
    app.use('/', routes);
    app.database = database;

    return app
}

const def = async() => {
    const app = configureExpress();
    await app.database.connect();

    return app;
}

module.exports = def