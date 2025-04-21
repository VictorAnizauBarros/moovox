const vaccineService = require("../services/vaccineService");

const vaccineController = {
  async getAllVaccines(req, res) {
    try {
      const vaccines = await vaccineService.getAllVaccines();
      res.json(vaccines);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vaccines" });
    }
  },
  async getVaccineById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const vaccine = await vaccineService.getVaccineById(id);
      res.json(vaccine);
    } catch (error) {
      res.status(404).json({ message: "Vaccine not found" });
    }
  },
  async createVaccine(req, res) {
    try {
      const {
        name,
        target_disease,
        type,
        manufacturer,
        batch,
        expiration_date,
        required_doses,
        dosing_interval,
        notes,
      } = req.body;

      const vaccine = await vaccineService.createVaccine(
        name,
        target_disease,
        type,
        manufacturer,
        batch,
        expiration_date,
        parseInt(required_doses),
        parseInt(dosing_interval),
        notes
      );
      res.redirect('/admin/vaccines');
    } catch (error) {
      res.status(400).json({ message: "Error creating vaccine" });
    }
  },
  async updateVaccine(req, res) {
    try {
      const id = parseInt(req.params.id);
      const {
        name,
        target_disease,
        type,
        manufacturer,
        batch,
        expiration_date,
        required_doses,
        dosing_interval,
        notes,
      } = req.body;
      const vaccine = await vaccineService.updateVaccine(
        id,
        name,
        target_disease,
        type,
        manufacturer,
        batch,
        expiration_date,
        parseInt(required_doses),
        parseInt(dosing_interval),
        notes
      );
      res.redirect('/admin/vaccines');
    } catch (error) {
      res.status(400).json({ message: "Error updating vaccine" });
    }
  },
  async deleteVaccine(req, res) {
    try {
      const id = parseInt(req.params.id);
      await vaccineService.deleteVaccine(id);
      res.redirect('/admin/vaccines');
    } catch (error) {
      res.status(400).json({ message: "Error deleting vaccine" });
    }
  },
};

module.exports = vaccineController;
