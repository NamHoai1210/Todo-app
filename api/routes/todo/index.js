const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getDataForView, getDataForEdit } = require('../../services/TodoActions/getData');
const addNewTask = require('../../services/TodoActions/addNewTask');
const { editTaskStatus, editATask } = require('../../services/TodoActions/editATask');
const deleteATask = require('../../services/TodoActions/deteleATask');
var config = require('../../config');

function getPayload(request){
    const token = request.headers['x-access-token'];
    return jwt.verify(token,config.secret);
}

router.get('/', async (request, response) => {
    let payload = getPayload(request);
    let userId = payload.id;
    try {
        let data = await getDataForView(userId);
        response.json(data);

    } catch (e) {
        response.status(404).send(e.message);
    }
    // response.json(data);
});
router.post('/', async (request, response) => {
    let payload = getPayload(request);
    let data = request.body;
    let { action } = data;
    let userId = payload.id;
    try {
        switch (action) {
            case 'add':
                let resData = await addNewTask(userId, data);
                response.json(resData);
                break;
            case 'edit':
                await editTaskStatus(userId, data.id, data.status);
                response.sendStatus(200);
                break;
            case 'delete':
                await deleteATask(userId, data.id);
                response.sendStatus(200);
                break;
            default:
                break;
        }
    } catch (e) {
        response.status(404).send(e.message);
    }
});
//edit 

router.get('/:id', async (request, response) => {
    let payload = getPayload(request);
    let { id } = request.params;
    let userId = payload.id;
    try {
        let data = await getDataForEdit(userId, id);
        response.json(data);
    } catch (e) {
        console.log(e);
        response.status(404).send(e.message);
    }
});

router.post('/:id', async (request, response) => {
    let payload = getPayload(request);
    let { id } = request.params;
    let data = request.body;
    let userId = payload.id;
    try {
        await editATask(userId, id, data);
        response.sendStatus(200);
    } catch (e) {
        response.status(404).send(e.message);
    }
});

module.exports = router;