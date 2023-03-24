const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserLogin} = require('../db');

const Post_Login = async (request, response) => {
    const { body } = request
    const { username, password } = body
  
    const user = await UserLogin.findOne ({  where: {
      username
    } })
  
  
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
  
  
    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid user or password'
      })
    } else {
  
      const userForToken = {
        id: user.id,
        username: user.username
      }
  
      console.log(userForToken);
  
      const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24 * 7
        }
      )
  
      response.send({
        id: user.id,
        name: user.name,
        username: user.username,
        token
      })
    }
  }

  module.exports = Post_Login;