const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const JWT_TOKEN = (data) => {
    const token = jwt.sign(data, jwtSecretKey);
    console.log('Token Generated', token);
    return token;
}

module.exports = JWT_TOKEN;