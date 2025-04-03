// Importa o arquivo app.js, que contém a aplicação Express
const app = require("./app");

// Define a porta do servidor, utilizando a variável de ambiente PORT ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor, fazendo com que ele escute na porta definida
app.listen(PORT, () => {
  // Exibe uma mensagem no console indicando que o servidor está rodando
  console.log(`Server is running on: http://localhost:${PORT}`);
});