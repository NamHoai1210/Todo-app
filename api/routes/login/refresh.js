const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');
const findUser = require('../../services/loginActions/findUser');
router.post('/', async (request, response) => {
    var refreshToken = request.body.refreshToken;
    if(refreshToken)
    { jwt.verify(refreshToken, config.refreshSecret,
        async (err,decode)=>{
            if (!err) {
                const user = await findUser(decode.email);
                if (user) {
                    const accessToken = jwt.sign(
                        {
                            id: user.id,
                            email: decode.email
                        },
                        config.secret,
                        { expiresIn: '20s' }
                    );
                    response.status(200).json({
                        token: accessToken,
                    });
                } else {
                    response.status(401).json({ message: 'Unauthorize' });
                }
            }
            else {
                response.status(403).json({ message: 'Forbidden' });
            }
    });
    
}
})
module.exports = router;