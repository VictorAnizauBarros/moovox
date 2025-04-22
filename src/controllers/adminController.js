const userService = require("../services/userService");
const animalsService = require("../services/animalService");
const vaccinesService = require("../services/vaccineService"); 
const vetService = require('../services/vetService');
const applicationService = require('../services/applicationService');
const adminController = {
  async getAdminDashboard(req, res) {
    try {
      const totalUsers = await userService.countUsers(); 
      const totalAnimals = await animalsService.countAnimals();
      const pending_doses = await applicationService.countPendentApplication();
      const lastThreeUsers = await userService.getLastThreeUsers(); 
      const lasThreePendingDoses = await applicationService.getLastThreePendingDoses(); 
      res.render("admin/dashboard",{
        totalUsers,
        totalAnimals, 
        pending_doses,
        lastThreeUsers, 
        lasThreePendingDoses,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getUsersDashboard(req, res) {
    try {
      const { search, role } = req.query;
      const users = await userService.getAllUsers({ search, role });
      res.render("admin/users", { users,
        search,
        query: { role }
       });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getAnimalsDashboard(req, res) {
    try {
      const { search, species, breed, health_status } = req.query;
  
      const filters = {
        search,
        species,
        breed,
        health_status,
      };
  
      const animals = await animalsService.getAllAnimalsWithDetails(filters);
  
      res.render("admin/animals", {
        animals,
        search,
        species,
        breed,
        health_status,
      });
    } catch (error) {
      console.error("Erro ao carregar dashboard de animais:", error);
      res.status(500).send("Erro interno do servidor");
    }
  },
  async getVaccineDashboard(req, res) {
    try {
      const { search, type, target_disease, expiration_date } = req.query;
  
      const vaccines = await vaccinesService.getFilteredVaccines({
        search,
        type,
        target_disease,
        expiration_date
      });
  
      res.render("admin/vaccines", {
        vaccines,
        search,
        type,
        target_disease,
        expiration_date
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getApplicationDashboard(req, res) {
    try {
      const vaccines = await vaccinesService.getAllVaccines(); 
      const animals = await animalsService.getAllAnimals();
      const veterinarios = await vetService.getAllVets(); 
  
      const { animal, vaccine, date, status } = req.query;
  
      // Todas as aplicações para o calendário
      const applications = await applicationService.getAllApplications();
  
      // 🔍 Filtro dinâmico para histórico
      const filteredApplications = await applicationService.getFilteredApplications({
        animal,
        vaccine,
        date,
        status
      });
  
      res.render("admin/applications", {
        applications,
        filteredApplications,
        vaccines,
        animals,
        veterinarios,
        query: req.query
      });
  
    } catch (error) {
      console.log(error); 
      res.status(500).send({ message: "Internal server error" });
    }
  }
};

module.exports = adminController;
