const Sequelize = require("sequelize");
const coneccao = require("./database");


const Resposta = coneccao.define("respostas",{
    corpo:{
        type: Sequelize.TEXT,
        allowNull:false

    },
    perguntaId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

Resposta.sync({force:false});

module.exports = Resposta;