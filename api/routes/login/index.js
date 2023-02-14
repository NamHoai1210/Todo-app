const express = require('express');
const router = express.Router();
const checkLoginMatch = require('../../services/loginActions/checkLoginMatch');
const jwt = require('jsonwebtoken');
router.use('/change-password', require('./change-password'));
router.use('/refresh', require('./refresh'));
var config = require('../../config');

router.post('/', async (request, response) => {
  var { email, password } = request.body;
  let loginMatched = await checkLoginMatch(email, password);
  if (loginMatched) {
    const accessToken = jwt.sign(
      {
        id: loginMatched.id,
        email: loginMatched.email
      },
      config.secret,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      {
        email: loginMatched.email
      },
      config.refreshSecret,
      { expiresIn: '1d' }
    );
    response.status(200).json({
      token: accessToken,
      refreshToken,
      email: loginMatched.email,
      name: loginMatched.name
    });
  }
  else {
    response.sendStatus(401);
  }
});

module.exports = router;