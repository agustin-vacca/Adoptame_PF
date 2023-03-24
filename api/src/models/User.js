const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
      },
      name: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
},   
{
    timestamps: false,
})
}