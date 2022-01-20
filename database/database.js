const Sequelize = require("sequelize");
const coneccao = new Sequelize("guiaperguntas","root","7A6o3f2g@",{
    host: 'localhost',
    dialect:'mysql'
});


module.exports = coneccao;