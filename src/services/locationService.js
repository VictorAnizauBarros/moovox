const prisma = require("../config/database");

const locationService = {
  async getAllLocations() {
    try {
      const locations = await prisma.location.findMany();
      return locations;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao buscar todas as localizações (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao buscar todas as localizações " + error.message);
    }
  },
  async getLocationById(id) {
    try {
      const location = await prisma.location.findUnique({ where: { id } });
      return location;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao buscar localização pelo ID (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao buscar localização pelo ID " + error.message);
    }
  },
  async createLocation(animal_id, latitude, longitude) {
    try {
      const location = await prisma.location.create({
        data: {
          animal_id,
          latitude,
          longitude,
        },
      });
      return location;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao criar localização (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao criar localização " + error.message);
    }
  },
  async updateLocation(id, animal_id, latitude, longitude) {
    try {
      const location = await prisma.location.update({
        where: { id:id },
        data: {
          animal_id,
          latitude,
          longitude,
        },
      });
      return location;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao atualizar localização (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao atualizar localização " + error.message);
    }
  },
  async deleteLocation(id) {
    try {
      const location = await prisma.location.delete({ where: { id } });
      return location;
    } catch (error) {
      // Registra o erro no console
      console.error(`Erro ao deletar localização (service): ${error}`);
      // Lança um erro com a mensagem de erro
      throw new Error("Erro ao deletar localização " + error.message);
    }
  },
};

module.exports = locationService; 
