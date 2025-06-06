const prisma = require("../config/database");

// Serviço responsável por gerenciar as operações relacionadas a animais
const animalService = {
  // Método para buscar todos os animais
  async getAllAnimals() {
    try {
      // Utiliza o Prisma para buscar todos os animais
      const animals = await prisma.animal.findMany();
      return animals;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao buscar todos os animais (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao buscar todos os animais: " + error.message);
    }
  },

  async getAllAnimalsWithDetails(filters = {}) {
    try {
      const where = {};
  
      if (filters.search) {
        where.name = {
          contains: filters.search, // Removido mode: 'insensitive'
        };
      }
  
      if (filters.species) {
        where.species = filters.species;
      }
  
      if (filters.breed) {
        where.breed = filters.breed;
      }
  
      if (filters.health_status) {
        where.health_status = filters.health_status;
      }
  
      const animals = await prisma.animal.findMany({
        where,
        orderBy: {
          name: 'asc',
        },
      });
  
      return animals;
    } catch (error) {
      console.error("Erro ao buscar animais com filtros no service:", error);
      throw new Error("Erro ao buscar animais com filtros");
    }
  },
  
  
  // Método para buscar um animal por ID
  async getAnimalById(id) {
    // Verifica se o ID foi fornecido
    if (!id) {
      // Lança um erro se o ID não foi fornecido
      throw new Error("Id do animal é obrigatório");
    }
    try {
      // Utiliza o Prisma para buscar o animal por ID
      const animal = await prisma.animal.findUnique({ where: { id } });
      return animal;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao buscar animal por id (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao buscar animal por id: " + error.message);
    }
  },
  // Método para criar um novo animal
  async createAnimal(
    name,
    species,
    breed,
    age,
    weight,
    health_status,
  ) {
    // Verifica se todos os campos foram fornecidos
    if (!name || !species || !breed || !age || !weight || !health_status) {
      // Lança um erro se algum campo não foi fornecido
      throw new Error("Todos os campos são obrigatórios");
    }
    try {
      // Utiliza o Prisma para criar o novo animal
      const newAnimal = await prisma.animal.create({
        data: {
          name,
          species,
          breed,
          age,
          weight,
          health_status,
        },
      });
      return newAnimal;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao criar animal (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao criar animal: " + error.message);
    }
  },
  // Método para atualizar um animal
  async updateAnimal(
    id,
    name,
    species,
    breed,
    age,
    weight,
    health_status,
  ) {
    // Verifica se o ID foi fornecido
    if (!id) {
      // Lança um erro se o ID não foi fornecido
      throw new Error("Id do animal é obrigatório");
    }
    try {
      // Utiliza o Prisma para atualizar o animal
      const updatedAnimal = await prisma.animal.update({
        where: { id },
        data: {
          name,
          species,
          breed,
          age,
          weight,
          health_status
        },
      });
      return updatedAnimal;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao atualizar animal (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao atualizar animal: " + error.message);
    }
  },
  // Método para deletar um animal
  async deleteAnimal(id) {
    // Verifica se o ID foi fornecido
    if (!id) {
      // Lança um erro se o ID não foi fornecido
      throw new Error("Id do animal é obrigatório");
    }
    try {
      // Utiliza o Prisma para deletar o animal
      const deletedAnimal = await prisma.animal.delete({ where: { id } });
      return deletedAnimal;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao deletar animal (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao deletar animal: " + error.message);
    }
  },
  async countAnimals(){
    try {
      const totalAnimals = await prisma.animal.count(); 
      return totalAnimals;
      
    } catch (error) {
      console.error(`Erro ao contar animais (service): ${error}`);
      throw new Error("Erro ao contar animais: " + error.message);
      
    }
  }
};

// Exporta o serviço
module.exports = animalService;