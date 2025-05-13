const app = require("./app");

const PORT = process.env.PORT || 3000;

// Inicia o servidor, fazendo com que ele escute na porta definida
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});