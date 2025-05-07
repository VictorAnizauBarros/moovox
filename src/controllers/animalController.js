// Importa o serviço de animal para realizar operações no banco de dados
const animalService = require("../services/animalService");

// Objeto controller que agrupa todos os métodos relacionados à entidade Animal
const animalController = {

  /**
   * Cria um novo animal no sistema com base nos dados recebidos da requisição.
   *
   * Valida os campos obrigatórios e converte os valores de idade e peso
   * antes de chamar o serviço responsável pela criação no banco de dados.
   *
   * @async
   * @function createAnimal
   * @param {import('express').Request} req - Objeto da requisição HTTP contendo os dados do animal.
   * @param {import('express').Response} res - Objeto da resposta HTTP usado para redirecionar ou retornar erro.
   * @returns {Promise<void>} - Redireciona para o dashboard ou envia erro 400/500.
   */
  async createAnimal(req, res) {
    try {
      const { name, species, breed, age, weight, health_status } = req.body;

      if (!name || !species || !breed || !age || !weight || !health_status) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const idade = parseInt(age);
      const peso = parseFloat(weight);

      await animalService.createAnimal(name, species, breed, idade, peso, health_status);

      res.redirect("/admin/animals");
    } catch (error) {
      console.error("Erro ao criar animal:", error);
      res.status(500).json({ message: "Erro ao criar animal" });
    }
  },

  /**
   * Atualiza os dados de um animal existente com base no ID informado.
   *
   * Valida o ID e os campos recebidos na requisição antes de atualizar
   * os dados no banco via serviço.
   *
   * @async
   * @function updateAnimal
   * @param {import('express').Request} req - Objeto da requisição HTTP com ID e novos dados do animal.
   * @param {import('express').Response} res - Objeto da resposta HTTP usado para redirecionar ou retornar erro.
   * @returns {Promise<void>} - Redireciona ou envia erro 400/500.
   */
  async updateAnimal(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const { name, species, breed, age, weight, health_status, user_id } = req.body;
      const idade = parseInt(age);
      const peso = parseFloat(weight);

      await animalService.updateAnimal(id, name, species, breed, idade, peso, health_status, user_id);

      res.redirect("/admin/animals");
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      res.status(500).json({ message: "Erro ao atualizar animal" });
    }
  },

  /**
   * Remove um animal do sistema com base no ID fornecido na URL.
   *
   * Valida o ID antes de chamar o serviço responsável pela exclusão no banco.
   *
   * @async
   * @function deleteAnimal
   * @param {import('express').Request} req - Objeto da requisição HTTP com o ID do animal a ser removido.
   * @param {import('express').Response} res - Objeto da resposta HTTP usado para redirecionar ou retornar erro.
   * @returns {Promise<void>} - Redireciona ou envia erro 400/500.
   */
  async deleteAnimal(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      await animalService.deleteAnimal(id);

      res.redirect("/admin/animals");
    } catch (error) {
      console.error("Erro ao deletar animal:", error);
      res.status(500).json({ message: "Erro ao deletar animal" });
    }
  },
};

// Exporta o controller para ser usado nas rotas
module.exports = animalController;
