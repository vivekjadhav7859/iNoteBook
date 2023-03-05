var jwt = require('jsonwebtoken');
const JWT_SECRET = 'vivekisverygoodboy$';

const fetchuser = (req,res,next)=>{
    //get the user from jwt token and add it to req object

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please auntheticate with valid user"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please auntheticate with valid user"});
    }
 
}
module.exports = fetchuser;