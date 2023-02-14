const express = require('express');
const router = express.Router();
const changePassword = require('../../services/loginActions/changePassword');
const jwt = require('jsonwebtoken');
const config = require('../../config');
router.post('/',async (request,response)=>{
    var token = request.headers['x-access-token'];      
    const payload = jwt.verify(token,config.secret);

    let {oldPassword, newPassword} = request.body;
    let userId = payload.id;
    try{
    await changePassword(oldPassword,newPassword,userId);
    response.sendStatus(200);
    }
    catch(e){
        response.sendStatus(401);
    }
});

module.exports = router;