
const usersRouter = require('express').Router();
const Get_User = require('../controllers-Auth0/Get_User');
const Post_User = require('../controllers-Auth0/Post_User');


usersRouter.get('/', Get_User);

usersRouter.post('/', Post_User);

module.exports = usersRouter