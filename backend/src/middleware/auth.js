const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401).json({message: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
        /* return { success: true, data: decoded }; */
        req.user = decoded;
        next();
    } catch (error) {
        /* return { success: false, error: error.message }; */
        res.sendStatus(401).json({message: 'Token is not valid'});
    }
    /* const result = verifyAccessToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next(); */
};

function admin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
}
module.exports = {authenticateMiddleware, admin};