// Importação de bibliotecas necessárias
const express = require("express"); // Framework para criar servidor web
const session = require("express-session"); // Gerenciamento de sessões
const path = require("path"); // Manipulação de caminhos de arquivos
require('dotenv').config(); // Carregamento de variáveis de ambiente
// Importação das rotas da aplicação
const routes = require('./routes/index');

// Criação da aplicação Express
const app = express();

// Configuração do motor de template (EJS)
app.set("view engine", "ejs"); // Definição do motor de template
app.set("views", path.join(__dirname, "views")); // Definição do diretório de views

// Configuração de middlewares
app.use(express.urlencoded({ extended: true })); // Parse de dados de formulários
app.use(express.json()); // Parse de dados JSON
app.use(express.static("src/public")); // Serviço de arquivos estáticos

// Configuração de sessões
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Chave secreta para criptografia de sessões
    resave: false, // Não re-salvar sessões se não houver alterações
    saveUninitialized: true, // Salvar sessões não inicializadas
  })
);

app.use((req, res, next) => {
  // Atribui a sessão atual à variável local 'session' para uso nas views
  res.locals.session = req.session;
  
  // Atribui os parâmetros de consulta da URL à variável local 'query' para uso nas views
  res.locals.query = req.query; 
  
  // Chama o próximo middleware na cadeia de execução
  next();
});

// Registra as rotas da aplicação no servidor Express
app.use(routes);

// Exportação da aplicação
module.exports = app;