const jwt = require('jsonwebtoken');
const { secret } = require('../../src/config');

const getTokenForUser = (userObject, time) => {
    // creating a JWT and returning it.
    // time Ex. 1m, 1h
    return jwt.sign(userObject, secret, { expiresIn: time });
};

const validateToken =  (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(499);
        res.json({message: 'Required Token.'});
        return;
    }

    jwt.verify(token, secret, (authError, decoded) => {
        if (authError) {
            res.status(403);
            res.json({ error: 'Token invalid, please login', message: authError });
            return;
        }

        console.log('decoded token', decoded);
        // sets the decoded JWT/user object on the request object for use in next middleware.
        req.decoded = decoded;
        next();
    });

};

const extendTokenLife = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(499);
        res.json({message: 'Required Token.'});
        return
    }

    jwt.verify(token, secret, (authError, decoded) => {
        if (authError) {
            res.status(403);
            res.json({ error: 'Token invalid, please login', message: authError });
            return;
        }

        req.decoded = decoded;

        const token = getTokenForUser({ user: decoded.user,
            access: true }, '10m');

        res.cookie('access_token', token, { maxAge: 604800, httpOnly:true });
        res.send({"data":decoded});
        // sets the decoded JWT/user object on the request object for use in next middleware.
        return next();
    });
};

const resolve = (req, res, next) => {
    res.status(200).send({});
    return next();
};

module.exports = {
    getTokenForUser,
    validateToken,
    resolve,
    extendTokenLife
};
