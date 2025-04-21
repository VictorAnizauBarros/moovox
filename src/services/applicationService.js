const prisma = require("../config/database");

const applicationService = {
  async getAllApplications() {
    try {
      const applications = await prisma.application.findMany();
      return applications;
    } catch (error) {
      console.log(
        "Erro ao buscar todas as aplicações (service): " + error.message
      );
      throw new Error(
        "Erro ao buscar todas as aplicações (service): " + error.message
      );
    }
  },
  async getApplicationById(id) {
    try {
      const application = await prisma.application.findUnique({
        where: {
          id: id,
        },
      });
      return application;
    } catch (error) {
      console.log(
        "Erro ao buscar aplicação por ID (service): " + error.message
      );
      throw new Error(
        "Erro ao buscar aplicação por ID (service): " + error.message
      );
    }
  },
  async createApplication(
    animal_id,
    vaccine_id,
    veterinario_id,
    application_date,
    status
  ) {
    try {
      const application = await prisma.application.create({
        data: {
          animal_id,
          vaccine_id,
          veterinario_id,
          application_date,
          status,
        },
      });
      return application;
    } catch (error) {
      console.log("Erro ao criar aplicação (service): " + error.message);
      throw new Error("Erro ao criar aplicação (service): " + error.message);
    }
  },
  async updateApplication(
    id,
    animal_id,
    vaccine_id,
    veterinario_id,
    application_date,
    status
  ) {
    try {
      const application = await prisma.application.update({
        where: {
          id: id,
        },
        data: {
          animal_id: animal_id,
          vaccine_id: vaccine_id,
          veterinario_id: veterinario_id,
          application_date: application_date,
          status: status,
        },
      });
      return application;
    } catch (error) {
      console.log("Erro ao atualizar aplicação (service): " + error.message);
      throw new Error(
        "Erro ao atualizar aplicação (service): " + error.message
      );
    }
  },
  async deleteApplication(id) {
    try {
      const application = await prisma.application.delete({
        where: {
          id: id,
        },
      });
      return application;
    } catch (error) {
      console.log("Erro ao deletar aplicação (service): " + error.message);
      throw new Error("Erro ao deletar aplicação (service): " + error.message);
    }
  },
};

module.exports = applicationService; 
