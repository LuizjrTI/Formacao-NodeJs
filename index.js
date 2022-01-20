const { render } = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const coneccao = require("./database/database");
const PerguntaModel = require("./database/PerguntaModel");
const RespostaModel = require("./database/RespostaModel");


//database
coneccao
  .authenticate()
  .then(() => {
    console.log("conexão feita com banco");
  })
  .catch((msgerro) => {
    console.log(msgerro);
  });

// Estou dizendo para o express usar o EJS como View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas
app.get("/", (req, res) => {
  //var nome = "luiz";
  //var lang = "java";
  //res.render("index", { nome: nome, lang: lang, empresa: "Sicoob" });

  PerguntaModel.findAll({ raw: true, order: [["id", "DESC"]] }).then(
    (listasDePerguntas) => {
      res.render("index", { perguntas: listasDePerguntas });
    }
  );
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

//recebe os dados do formulario.
app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  PerguntaModel.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

//recebe os dados vindo da resposta pergunta
app.post("/salvarResposta", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaID = req.body.pergunta;
  RespostaModel.create({
    corpo: corpo,
    perguntaId: perguntaID,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaID);
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  PerguntaModel.findOne({
    where: { id: id },
  }).then((PerguntaModel) => {
    if (PerguntaModel != undefined) {//Pergunta encontrada
      RespostaModel.findAll({
        where: { perguntaId: id },
        order:[['id','DESC']]
      }).then((respostas) => {
        res.render("PerguntaExibir", {
          pergunta: PerguntaModel,
          respostas: respostas
          
        });
      });
    } else {
      // Pergunta não encontrada
      res.redirect("/");
    }
  });
});

app.get("/:nome/:lang", (req, res) => {
  var nome = req.params.nome;
  var lang = req.params.lang;
  var exibirmsg = false;
  var produtos = [
    { nome: "Doritos", preco: 3.14 },
    { nome: "Coca-cola", preco: 5 },
    { nome: "Leite", preco: 1.49 },
  ];

  res.render("index", {
    nome: nome,
    lang: lang,
    empresa: "Sicoob",
    msg: exibirmsg,
    produtos: produtos,
  });
});

app.listen(8080, () => {
  console.log("App rodando !!");
});
