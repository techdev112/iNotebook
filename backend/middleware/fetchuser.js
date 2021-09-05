const jwt = require("jsonwebtoken");
const JWT_SECRET = "FellowDev";
const fetchuser = (req, res, next) => {
  //Get the user from the JWT token and add id to request object
  const token = req.header('auth-token');

  if(!token) {
    return res.status(401).send({error: "Please authenticate using a valid tokens"})
  }
  try {
    const userData = jwt.verify(token, JWT_SECRET)
    req.user = userData.user

  } catch (error) {
    return res.status(401).send({error: "Please authenticate using a valid tokens"})
  }
  
  next()
}
module.exports = fetchuser;