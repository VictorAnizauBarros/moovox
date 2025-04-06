const vaccineService = require("../services/vaccineService");

const vaccineController = {
  async getAllVaccines(req, res) {
    try {
      const vaccines = await vaccineService.getAllVaccines();
      res.json({
        message: "Vacinas encontradas coms sucesso.",
        data: vaccines,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar vacinas.",
        error: error.message,
      });
    }
  },
  async getVaccineById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const vaccine = await vaccineService.getVaccineById(id);
      res.json({
        message: "Vacina encontrada com sucesso.",
        data: vaccine,
      });
    } catch (error) {
      res.status(404).json({
        message: "Vacina não encontrada.",
        error: error.message,
      });
    }
  },
  async createVaccine(req, res) {
    try {
      const { animal_id, name, vaccination_date, next_dose } = req.body;
      const vaccine = await vaccineService.createVaccine(
        animal_id,
        name,
        vaccination_date,
        next_dose
      );
      res.json({
        message: "Vacina criada com sucesso.",
        data: vaccine,
      });
    } catch (error) {
      res.status(400).json({
        message: "Erro ao criar vacina.",
        error: error.message,
      });
    }
  },
  async updateVaccine(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }
      const { name, vaccination_date, next_dose } = req.body;
      const vaccine = await vaccineService.updateVaccine(
        id,
        name,
        vaccination_date,
        next_dose
      );
      res.json({
        message: "Vacina atualizada com sucesso.",
        data: vaccine,
      });
    } catch (error) {
      res.status(404).json({
        message: "Vacina não encontrada.",
        error: error.message,
      });
    }
  },
  async deleteVaccine(req, res) {
    try {
      const id = parseInt(req.params.id);
      await vaccineService.deleteVaccine(id);
      res.json({
        message: "Vacina deletada com sucesso.",
      });
    } catch (error) {
      res.status(404).json({
        message: "Vacina não encontrada.",
        error: error.message,
      });
    }
  },
};

module.exports = vaccineController; 