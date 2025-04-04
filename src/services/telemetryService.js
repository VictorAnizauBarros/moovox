const prisma = require("../config/database");

const telemetryService = {
  async getAllTelemetrys() {
    try {
      const telemetrys = await prisma.telemetry.findMany();
      return telemetrys;
    } catch (error) {
      console.error(`Erro ao buscar todas as telemetrias (service): ${error}`);
      throw new Error(`Erro ao buscar todas as telemetrias: ${error.message}`);
    }
  },
  async getTelemetryById(id) {
    if (!id) {
      throw new Error("Id é obrigatório");
    }
    try {
      const telemetry = await prisma.telemetry.findUnique({ where: { id } });
      return telemetry;
    } catch (error) {
      console.error(`Erro ao buscar telemetria por id (service): ${error}`);
      throw new Error(`Erro ao buscar telemetria por id: ${error.message}`);
    }
  },
  async createTelemetry(animal_id, heartbeat, temperature, activity_level) {
    if (!animal_id || !heartbeat || !temperature || !activity_level) {
      throw new Error("Todos os campos são obrigatórios");
    }
    try {
      const telemetry = await prisma.telemetry.create({
        data: {
          animal_id,
          heartbeat,
          temperature,
          activity_level,
        },
      });
      return telemetry;
    } catch (error) {
      console.error(`Erro ao criar telemetria (service): ${error}`);
      throw new Error(`Erro ao criar telemetria: ${error.message}`);
    }
  },
  async updateTelemetry(id, animal_id, heartbeat, temperature, activity_level) {
    if (!id || !heartbeat || !temperature || !activity_level) {
      throw new Error("Todos os campos são obrigatórios");
    }
    try {
      const telemetry = await prisma.telemetry.update({
        where: { id: id },
        data: {
          animal_id,
          heartbeat,
          temperature,
          activity_level,
        },
      });
      return telemetry;
    } catch (error) {
      console.error(`Erro ao atualizar telemetria (service): ${error}`);
      throw new Error(`Erro ao atualizar telemetria: ${error.message}`);
    }
  },
  async deleteTelemetry(id) {
    if (!id) {
      throw new Error("Id é obrigatório");
    }
    try {
      const telemetry = await prisma.telemetry.delete({ where: { id } });
      return telemetry;
    } catch (error) {
      console.error(`Erro ao deletar telemetria (service): ${error}`);
      throw new Error(`Erro ao deletar telemetria: ${error.message}`);
    }
  },
};

module.exports = telemetryService;
