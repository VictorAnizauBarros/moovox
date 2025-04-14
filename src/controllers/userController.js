// Importa o serviço de usuário
const userService = require("../services/userService");

// Define o controlador de usuário
const userController = {
  /**
   * Retorna todos os usuários
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  async getAllUsers(req, res) {
    try {
      // Busca todos os usuários no serviço de usuário
      const users = await userService.getAllUsers();
      // Retorna os usuários com sucesso
      return res.status(200).json({
        message: "Usuários encontrados com sucesso.",
        data: users,
      });
    } catch (error) {
      // Retorna erro ao buscar usuários
      return res.status(500).json({
        message: "Erro ao buscar usuários.",
        error: error.message,
      });
    }
  },

  /**
   * Retorna um usuário por ID
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  async getUserById(req, res) {
    try {
      // Converte o ID para número
      const id = parseInt(req.params.id);
      // Verifica se o ID é válido
      if (isNaN(id)) {
        // Retorna erro se o ID for inválido
        return res.status(400).json({
          message: "Id inválido.",
          error: "Id deve ser um número.",
        });
      }
      // Busca o usuário no serviço de usuário
      const user = await userService.getUserById(id);
      // Verifica se o usuário foi encontrado
      if (!user) {
        // Retorna erro se o usuário não for encontrado
        return res.status(404).json({
          message: "Usuário não encontrado.",
          error: "Usuário não encontrado.",
        });
      }
      // Retorna o usuário com sucesso
      return res.status(200).json({
        message: "Usuário encontrado com sucesso.",
        data: user,
      });
    } catch (error) {
      // Retorna erro ao buscar usuário
      return res.status(404).json({
        message: "Usuário não encontrado.",
        error: error.message,
      });
    }
  },

  /**
   * Cria um novo usuário
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  async createUser(req, res) {
    try {
      // Extrai os dados do corpo da requisição
      const { name, email, password, role } = req.body;
      // Verifica se todos os campos são obrigatórios
      if (!name || !email || !password || !role) {
        // Retorna erro se algum campo for inválido
        return res.status(400).json({
          message: "Erro ao criar usuário.",
          error: "Todos os campos são obrigatórios.",
        });
      }
      // Cria o usuário no serviço de usuário
      const user = await userService.createUser(name, email, password, role);
      // Retorna o usuário criado com sucesso
      return res.status(201).json({
        message: "Usuário criado com sucesso",
        data: user,
      });
    } catch (error) {
      // Retorna erro ao criar usuário
      return res.status(400).json({
        message: "Erro ao criar usuário",
        data: error.message,
      });
    }
  },

  /**
   * Atualiza um usuário
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  async updateUser(req, res) {
    try {
      // Converte o ID para número
      const id = parseInt(req.params.id);
      // Verifica se o ID é válido
      if (isNaN(id)) {
        // Retorna erro se o ID for inválido
        return res.status(400).json({
          message: "Id inválido.",
          error: "Id deve ser um número.",
        });
      }
      // Extrai os dados do corpo da requisição
      const { name, email, password, role } = req.body;
      // Verifica se pelo menos um campo é obrigatório
      if (!name && !email && !password && !role) {
        // Retorna erro se nenhum campo for informado
        return res.status(400).json({
          message: "Erro ao atualizar usuário.",
          error: "Pelo menos um campo deve ser informado.",
        });
      }
      // Atualiza o usuário no serviço de usuário
      const updatedUser = await userService.updateUser(
        id,
        name,
        email,
        password,
        role
      );
      // Verifica se o usuário foi atualizado
      if (!updatedUser) {
        // Retorna erro se o usuário não for encontrado
        return res.status(404).json({
          message: "Usuário não encontrado.",
          error: "Usuário não encontrado.",
        });
      }
      // Retorna o usuário atualizado com sucesso
      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        data: updatedUser,
      });
    } catch (error) {
      // Retorna erro ao atualizar usuário
      return res.status(404).json({
        message: "Usuário não encontrado",
        error: error.message,
      });
    }
  },

  /**
   * Deleta um usuário
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  async deleteUser(req, res) {
    try {
      // Converte o ID para número
      const id = parseInt(req.params.id);
      // Verifica se o ID é válido
      if (isNaN(id)) {
        // Retorna erro se o ID for inválido
        return res.status(400).json({
          message: "Id inválido.",
          error: "Id deve ser um número.",
        });
      }
      // Deleta o usuário no serviço de usuário
      const deletedUser = await userService.deleteUser(id);
      // Verifica se o usuário foi deletado
      if (!deletedUser) {
        // Retorna erro se o usuário não for encontrado
        return res.status(404).json({
          message: "Usuário não encontrado.",
          error: "Usuário não encontrado.",
        });
      }
      // Retorna o usuário deletado com sucesso
      return res.status(200).json({
        message: "Usuário deletado com sucesso",
        data: deletedUser,
      });
    } catch (error) {
      // Retorna erro ao deletar usuário
      return res.status(404).json({
        message: "Usuário não encontrado",
        error: error.message,
      });
    }
  },
};

// Exporta o controlador de usuário
module.exports = userController;
