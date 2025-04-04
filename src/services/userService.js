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
      throw new Error("Erro ao buscar todos os usuários (service): " + error.message);
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
      throw new Error("Erro ao buscar usuário pelo id (service): " + error.message);
    }
  },

  // Método para criar um novo usuário
  async createUser(name, email, password, role) {
    try {
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
  async updateUser(id, name, email, password, role) {
    try {
      // Busca do usuário a ser atualizado
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        // Tratamento de erro caso o usuário não seja encontrado
        throw new Error("Usuário não encontrado");
      }
      // Criptografia da senha utilizando o bcryptjs
      const hashedPassword = await bcrypt.hash(password, 8);
      // Utilização do Prisma para atualizar o usuário no banco de dados
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password: hashedPassword,
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
      await prisma.user.delete({ where: { id } });
      return user;
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema na deleção
      console.error(`Erro ao deletar usuário no service: ${error}`);
      throw new Error("Erro ao deletar usuário (service): " + error.message);
    }
  },

  // Método para realizar login
  async login(email, password) {
    try {
      // Busca do usuário por e-mail
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        // Tratamento de erro caso o usuário não seja encontrado
        throw new Error("Usuário não encontrado");
      }
      // Verificação da senha utilizando o bcryptjs
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        // Tratamento de erro caso a senha seja inválida
        throw new Error("Senha inválida");
      }
      return user;
    } catch (error) {
      // Tratamento de erro caso ocorra algum problema no login
      console.error(`Erro ao realizar login no service: ${error}`);
      throw new Error("Erro ao realizar login (service): " + error.message);
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
};

// Exportação do serviço de usuário
module.exports = userService;