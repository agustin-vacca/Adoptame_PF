const jwt = require('jsonwebtoken')

const UserExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''
 
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.slice(7)
  }

  console.log(token);
  
  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log(decodedToken.id)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken

  request.userId = userId

  next()
}


module.exports = UserExtractor;