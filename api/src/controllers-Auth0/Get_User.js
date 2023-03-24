const {UserLogin} = require('../db');

const Get_User = async (request, response) => {
    const users = await UserLogin.findAll({})
    response.json(users)
  }

  module.exports = Get_User;