
const loginRouter = require('express').Router()

const Post_Login = require('../controllers-Auth0/Post_Login');

loginRouter.post('/', Post_Login);

module.exports = loginRouter
