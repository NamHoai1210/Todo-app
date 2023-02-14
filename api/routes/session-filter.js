const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
router.all('/(:layout)?(/:path)?', (request, response, next) => {
    var { layout, path } = request.params;
    var token = request.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, (
            err, decode
        ) => {
            if (err) {
                if (!layout || layout === 'todo' || layout === 'logout' || layout === 'login' && path === 'change-password') {
                    response.status(401).json({ message: 'Invalid token' });
                } else {
                    next();
                }
            } else {
                if (layout === 'register') {
                    response.json({ token: null });
                }
                next();
            }
        });
    }else{
        if (!layout || layout === 'todo' || layout === 'logout' || layout === 'login' && path === 'change-password') {
            response.status(403).json({ message: 'Forbidden' });
        } else {
            next();
        }
    }
});
module.exports = router;