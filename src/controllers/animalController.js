// Importa o serviço de animal para realizar operações no banco de dados
const animalService = require("../services/animalService");

// Define o controlador de animal, responsável por gerenciar as requisições relacionadas a animais
const animalController = {

  // Método para buscar todos os animais
  async getAllAnimals(req, res) {
    try {
      // Chama o serviço de animal para buscar todos os animais
      const animals = await animalService.getAllAnimals();
      // Retorna a resposta com os animais encontrados
      return res.status(200).json({
        message: "Animais encontrados com sucesso.",
        data: animals,
      });
    } catch (error) {
      // Registra o erro no console
      console.error(error);
      // Retorna a resposta com erro
      return res.status(500).json({ message: "Erro ao buscar animais." });
    }
  },

  // Método para buscar um animal por ID
  async getAnimalById(req, res) {
    try {
      // Extrai o ID do animal da requisição
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }
      // Chama o serviço de animal para buscar o animal pelo ID
      const animal = await animalService.getAnimalById(id);
      // Verifica se o animal foi encontrado
      if (!animal) {
        // Retorna a resposta com erro
        return res.status(404).json({
          message: "Animal não encontrado",
        });
      }
      // Retorna a resposta com o animal encontrado
      return res.status(200).json({
        message: "Animal encontrado com sucesso.",
        data: animal,
      });
    } catch (error) {
      // Registra o erro no console
      console.error(error);
      // Retorna a resposta com erro
      return res.status(500).json({ message: "Erro ao procurar animal por id." });
    }
  },

  // Método para criar um novo animal
  async createAnimal(req, res) {
    try {
      // Extrai os dados do animal da requisição
      const { name, species, breed, age, weight, health_status, user_id } = req.body;
      if (!name || !species || !breed || !age || !weight || !health_status || !user_id) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }
      // Chama o serviço de animal para criar o novo animal
      const animal = await animalService.createAnimal(
        name,
        species,
        breed,
        age,
        weight,
        health_status,
        user_id
      );
      // Retorna a resposta com o animal criado
      return res.status(201).json({
        message: "Animal criado com sucesso",
        data: animal,
      });
    } catch (error) {
      // Registra o erro no console
      console.error(error);
      // Retorna a resposta com erro
      return res.status(500).json({ message: "Erro ao criar animal" });
    }
  },

  // Método para atualizar um animal existente
  async updateAnimal(req, res) {
    try {
      // Extrai o ID do animal da requisição
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }
      // Extrai os dados do animal da requisição
      const { name, species, breed, age, weight, health_status, user_id } = req.body;
      // Chama o serviço de animal para atualizar o animal
      const animal = await animalService.updateAnimal(
        id,
        name,
        species,
        breed,
        age,
        weight,
        health_status,
        user_id
      );
      // Retorna a resposta com o animal atualizado
      return res
        .status(200)
        .json({ message: "Animal atualizado com sucesso", data: animal });
    } catch (error) {
      // Registra o erro no console
      console.error(error);
      // Retorna a resposta com erro
      return res.status(500).json({ message: "Erro ao atualizar animal" });
    }
  },

  // Método para deletar um animal existente
  async deleteAnimal(req, res) {
    try {
      // Extrai o ID do animal da requisição
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }
      // Chama o serviço de animal para deletar o animal
      await animalService.deleteAnimal(id);
      // Retorna a resposta com o animal deletado
      return res.status(200).json({ message: "Animal deletado com sucesso" });
    } catch (error) {
      // Registra o erro no console
      console.error(error);
      // Retorna a resposta com erro
      return res.status(500).json({ message: "Erro ao deletar animal" });
    }
  },
};

// Exporta o controlador de animal
module.exports = animalController;