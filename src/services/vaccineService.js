const prisma = require("../config/database");

const vaccineService = {
  async getAllVaccines() {
    try {
      const vaccines = await prisma.vaccine.findMany();
      return vaccines;
    } catch (error) {
      console.log(
        "Erro ao buscar todas as vacinas (service): " + error.message
      );
      throw new Error(
        "Erro ao buscar todas as vacinas (service): " + error.message
      );
    }
  },
  async getVaccineById(id) {
    try {
      if (!id) {
        throw new Error("Id da vacina é obrigatório");
      }
      const vaccine = await prisma.vaccine.findUnique({ where: { id: id } });
      return vaccine;
    } catch (error) {
      console.log("Erro ao buscar vacina por id (service): " + error.message);
      throw new Error(
        "Erro ao buscar vacina por id (service): " + error.message
      );
    }
  },
  async createVaccine(
    name,
    target_disease,
    type,
    manufacturer,
    batch,
    expiration_date,
    required_doses,
    dosing_interval,
    notes
  ) {
    try {
      const vaccine = await prisma.vaccine.create({
        data: {
          name: name,
          target_disease: target_disease,
          type: type,
          manufacturer: manufacturer,
          batch: batch,
          expiration_date: expiration_date,
          required_doses: required_doses,
          dosing_interval: dosing_interval,
          notes: notes,
        },
      });
      return vaccine;
    } catch (error) {
      console.log("Erro ao criar vacina (service): " + error.message);
      throw new Error("Erro ao criar vacina (service): " + error.message);
    }
  },
  async updateVaccine(
    id,
    name,
    target_disease,
    type,
    manufacturer,
    batch,
    expiration_date,
    required_doses,
    dosing_interval,
    notes
  ) {
    try {
      const vaccine = await prisma.vaccine.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          target_disease: target_disease,
          type: type,
          manufacturer: manufacturer,
          batch: batch,
          expiration_date: expiration_date,
          required_doses: required_doses,
          dosing_interval: dosing_interval,
          notes: notes,
        },
      });
      return vaccine;
    } catch (error) {
      console.error("Erro ao atualizar vacina (service): " + error.message);
      throw new Error("Erro ao atulizar vacina (service): " + error.message);
    }
  },
  async deleteVaccine(id) {
    try {
      const vaccine = await prisma.vaccine.delete({
        where: {
          id: id,
        },
      });
      return vaccine;
    } catch (error) {
      console.error("Erro ao deletar vacina (service): " + error.message);
      throw new Error("Erro ao deletar vacina (service): " + error.message);
    }
  },
};

module.exports = vaccineService; 
