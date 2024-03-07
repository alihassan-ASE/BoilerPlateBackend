const express = require('express');
const routes = express.Router();
const { login, send_opt, verify_otp } = require('../../controllers/auth/index.tsx');
const {validateLoginData} = require('../../middlewares/AuthMiddleWare/index.tsx');

routes.post('/send_otp', validateLoginData, send_opt);
routes.post('/verify_otp', verify_otp);
routes.post('/login', login);
// routes.post('/register', registration);

module.exports = routes;