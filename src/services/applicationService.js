const prisma = require("../config/database");


const applicationService = {
  async getAllApplications() {
    try {
      const applications = await prisma.application.findMany({
        include: {
          animal: true, 
          vaccine: true
        }
      });
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
    next_application_date,
    status
  ) {
    try {
      const application = await prisma.application.create({
        data: {
          animal_id,
          vaccine_id,
          veterinario_id,
          application_date,
          next_application_date: next_application_date ? next_application_date : null,
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
    next_application_date,
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
          next_application_date: next_application_date ? next_application_date : null,
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
  async getFilteredApplications(filters) {
    try {
      const where = {};
  
      if (filters.animal) {
        where.animal_id = parseInt(filters.animal);
      }
  
      if (filters.vaccine) {
        where.vaccine_id = parseInt(filters.vaccine);
      }
  
      if (filters.status) {
        where.status = filters.status;
      }
  
      if (filters.date) {
        where.application_date = filters.date;
      }
  
      const applications = await prisma.application.findMany({
        where,
        include: {
          animal: true,
          vaccine: true,
          veterinario: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          application_date: 'desc',
        },
      });
  
      return applications;
    } catch (error) {
      console.log("Erro ao buscar aplicações filtradas (service): " + error.message);
      throw new Error("Erro ao buscar aplicações filtradas (service): " + error.message);
    }
  }, 
  async countPendentApplication(){
    try {
      const pending_doses = await prisma.application.count({
        where: {
          status: "pendente"
        }
      }
      ); 
      return pending_doses;
      
    } catch (error) {
      console.log("Erro ao contar aplicações pendentes (service): " + error.message);
      throw new Error("Erro ao contar aplicações pendentes (service): " + error.message);
      
    }
  }, 
  async getLastThreePendingDoses(){
    try {
      const lasThreePendingDoses = await prisma.application.findMany({
        where: {
          status: "pendente"
        }, 
        orderBy: {
          application_date: 'asc'
        },
        take: 3,
        select: {
          application_date: true, 
          animal: {
            select: {
              name: true
            }
           
          }
        }
      }); 
      return lasThreePendingDoses;
      
    } catch (error) {
      console.log("Erro ao buscar as últimas três doses pendentes (service): " + error.message);
      throw new Error("Erro ao buscar as últimas três doses pendentes (service): " + error.message);
      
    }
  }
};

module.exports = applicationService; 
