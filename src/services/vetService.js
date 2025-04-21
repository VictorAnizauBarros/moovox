const prisma = require("../config/database");

const vetService = {
  async getAllVets() {
    try {
      const veterinarios = await prisma.veterinario.findMany({
        include: { user: true },
      });
      return veterinarios;
    } catch (error) {
      console.log("Erro ao buscar veterinários (service): " + error.message);
      throw new Error(
        "Erro ao busucar veterinários (service): " + error.message
      );
    }
  },
  async getVetById(id) {
    try {
      const veterinario = await prisma.veterinario.findUnique({
        where: { id },
        include: { user: true },
      });
      return veterinario;
    } catch (error) {
      console.log(
        "Erro ao buscar veterinário por id (service): " + error.message
      );
      throw new Error(
        "Erro ao buscar veterinário por id (service): " + error.message
      );
    }
  },
};

module.exports = vetService; 
