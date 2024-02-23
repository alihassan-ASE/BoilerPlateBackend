const express = require('express');
const routes = express.Router();
const { login } = require('../../controllers/auth/index.tsx');
const {validateLoginData} = require('../../middlewares/AuthMiddleWare/index.tsx');

routes.post('/login', validateLoginData, login);
// routes.post('/register', registration);

module.exports = routes;