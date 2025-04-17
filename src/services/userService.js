// Importação do Prisma, uma ferramenta de ORM para interagir com o banco de dados
const prisma = require("../config/database");

// Importação do bcryptjs, uma biblioteca para criptografia de senhas
const bcrypt = require("bcryptjs");

// Definição do serviço de usuário
const userService = {
  // Método para buscar todos os usuários
  async getAllUsers() {
    try {
      // Utilização do Prisma para buscar todos os usuários no banco de dados
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema na busca
      console.error(`Erro ao buscar todos os usuários no service: ${error}`);
      throw new Error(
        "Erro ao buscar todos os usuários (service): " + error.message
      );
    }
  },

  // Método para buscar um usuário por ID
  async getUserById(id) {
    try {
      // Utilização do Prisma para buscar um usuário por ID no banco de dados
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        // Tratamento de erro caso o usuário não seja encontrado
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema na busca
      console.error(`Erro ao buscar usuário pelo id no service: ${error}`);
      throw new Error(
        "Erro ao buscar usuário pelo id (service): " + error.message
      );
    }
  },

  // Método para criar um novo usuário
  async createUser(name, email, password, role) {
    try {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) throw new Error("Email já cadastrado no sistema.");

      // Criptografia da senha utilizando o bcryptjs
      const hashedPassword = await bcrypt.hash(password, 8);
      // Utilização do Prisma para criar um novo usuário no banco de dados
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });
      return newUser;
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema na criação
      console.error(`Erro ao criar usuário no service: ${error}`);
      throw new Error("Erro ao criar usuário (service): " + error.message);
    }
  },

  // Método para atualizar um usuário
  async updateUser(id, name, email,role) {
    try {
      // Busca do usuário a ser atualizado
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        // Tratamento de erro caso o usuário não seja encontrado
        throw new Error("Usuário não encontrado");
      }
  
      // Utilização do Prisma para atualizar o usuário no banco de dados
      const updatedUser = await prisma.user.update({
        where: { id: id},
        data: {
          name,
          email,
          role,
        },
      });
      return updatedUser;
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema na atualização
      console.error(`Erro ao atualizar usuário no service: ${error}`);
      throw new Error("Erro ao atualizar usuário (service): " + error.message);
    }
  },

  // Atualizar dados parciais (sem trocar a senha)
  async updateUserInfo(id, data) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) throw new Error("Usuário não encontrado.");

      const updatedUser = await prisma.user.update({
        where: { id },
        data,
      });
      return updatedUser;
    } catch (error) {
      console.error(`Erro ao atualizar usuário no service: ${error}`);
      throw new Error("Erro ao atualizar usuário (service): " + error.message);
    }
  },

  // Trocar apenas a senha
  async changePassword(id, newPassword) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) throw new Error("Usuário não encontrado.");

      const hashedPassword = await bcrypt.hash(newPassword, 8);

      const changedPassword = await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
    } catch (error) {
      console.error(`Erro ao trocar senha no service: ${error}`);
      throw new Error("Erro ao trocar senha (service): " + error.message);
    }
  },

  // Método para deletar um usuário
  async deleteUser(id) {
    try {
      // Busca do usuário a ser deletado
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        // Tratamento de erro caso o usuário não seja encontrado
        throw new Error("Usuário não encontrado");
      }
      // Utilização do Prisma para deletar o usuário no banco de dados
      return await prisma.user.delete({ where: { id } });
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema na deleção
      console.error(`Erro ao deletar usuário no service: ${error}`);
      throw new Error("Erro ao deletar usuário (service): " + error.message);
    }
  },

  // Método para realizar login
  async login(email, password) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Senha incorreta");
      }

      return user;
    } catch (error) {
      console.error(`Erro ao realizar login no service: ${error}`);
      throw new Error("Erro ao realizar login: " + error.message);
    }
  },

  // Método para validar um usuário
  async validateUser(id) {
    try {
      // Busca do usuário por ID
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        // Tratamento de erro caso o usuário não seja encontrado
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema na validação
      console.error(`Erro ao validar usuário no service: ${error}`);
      throw new Error("Erro ao validar usuário (service): " + error.message);
    }
  },
  async getUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user;
    } catch (error) {
      console.error(`Erro ao buscar usuário pelo email no service: ${error}`);
      throw new Error(
        "Erro ao buscar usuário pelo email (service): " + error.message
      );
    }
  },
};

// Exportação do serviço de usuário
module.exports = userService;
