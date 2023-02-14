const express = require('express');
const router = express.Router();
const addNewUser = require('../../services/loginActions/addNewUser');

router.post('/',async(request,response)=>{
    let data = request.body;
    data.name = data.firstName + ' ' + data.lastName;
    try{
     await addNewUser(data);
    response.sendStatus(200);
}catch(e){
    console.log(e);
    response.status(500).send(e);
}  
});

module.exports = router;