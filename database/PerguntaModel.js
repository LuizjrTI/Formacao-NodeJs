const Sequelize = require("sequelize");
const coneccao = require("./database");


const Pergunta = coneccao.define('perguntas',{

    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force:false}).then(()=>{
    console.log("Tabela de Perguntas criada!")
});

module.exports = Pergunta;