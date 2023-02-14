const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt= require('jsonwebtoken');
const config = require('../config');
const findUser = require('../services/loginActions/findUser');
router.get('/', async(request, response) => {
    var token = request.headers['x-access-token'];
    if (!token) {
      return response.json({});
    }
    const payload = jwt.verify(token, config.secret);
    const user = await findUser(payload.email);
    if(user){
        response.json({email:payload.email,name:user.name});
    }else{
        response.json({});
    }
  });
module.exports = router;