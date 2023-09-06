const { sign, verify } = require("jsonwebtoken")

function authenticationUser({ username, email, password }) {
    try {

        const token = sign(
            {
                username: username,
                email: email,
                password: password,
            },
            "8ee7ed39-c9b5-49eb-95cf-cd0936ea172b",  
           
        );
        console.log(token);
        return {username: username, email: email, token: token};
    } catch (err) {
        throw new Error('error generetor token');
    }
}

function ensureAuthenticated(req, res, next) {
    const tk = req.headers.authorization;
    if (!tk) {
        return res.status(401).json({
            message: "token not found",
        });
    }
    const [, token] = tk.split(" ");
    console.log(token);
    try {
        verify(token, process.env.SECRET_JWT);
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'invalid token',
        });
    }
}

module.exports = { ensureAuthenticated, authenticationUser }

