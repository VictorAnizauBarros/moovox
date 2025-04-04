const prisma = require("../config/database");

const vaccineService = {
  async getAllVaccines() {
    try {
      const vaccines = await prisma.vaccine.findMany();
      return vaccines;
    } catch (error) {
      console.error(`Erro ao realizar a consulta de vacinas: ${error}`);
      throw new Error(
        "Erro ao realizar a consulta de vacinas:" + error.message
      );
    }
  },
  async getVaccineById(id) {
    try {
      const vaccine = await prisma.vaccine.findUnique({ where: { id } });
      return vaccine;
    } catch (error) {
      console.error(`Erro ao realizar a consulta de vacina por id: ${error}`);
      throw new Error(
        "Erro ao realizar a consulta de vacina por id:" + error.message
      );
    }
  },
  async createVaccine(animal_id, name, vaccination_date, next_dose) {
    try {
      const newVaccine = await prisma.$transaction(async (prisma) => {
        const vaccine = await prisma.vaccine.create({
          data: {
            animal_id,
            name,
            vaccination_date,
            next_dose,
          },
        });
        return vaccine;
      });
      return newVaccine;
    } catch (error) {
      console.error(`Erro ao criar uma vacina: ${error}`);
      throw new Error("Erro ao criar uma vacina:" + error.message);
    }
  },
  async updateVaccine(id, name, vaccination_date, next_dose) {
    try {
      const updatedVaccine = await prisma.vaccine.update({
        where: { id },
        data: {
          name,
          vaccination_date,
          next_dose,
        },
      });
      return updatedVaccine;
    } catch (error) {
        console.error(`Erro ao atualizar uma vacina: ${error}`);
        throw new Error("Erro ao atualizar uma vacina:" + error.message);

    }
  },
  async deleteVaccine(id) {
    try {
        const deletedVaccine = await prisma.vaccine.delete({ where: {id:id}});
        return deletedVaccine; 
        
    } catch (error) {
        console.error(`Erro ao deletar uma vacina: ${error}`);
        throw new Error("Erro ao deletar uma vacina:" + error.message);
        
    }
  }, 

};

module.exports = vaccineService; 