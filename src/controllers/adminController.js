const userService = require("../services/userService");
const animalsService = require("../services/animalService");
const vaccinesService = require("../services/vaccineService"); 
const vetService = require('../services/vetService');
const applicationService = require('../services/applicationService');
const adminController = {
  async getAdminDashboard(req, res) {
    try {
      res.render("admin/dashboard");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getUsersDashboard(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.render("admin/users", { users });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getAnimalsDashboard(req, res) {
    try {
      const animals = await animalsService.getAllAnimals();
      res.render("admin/animals", { animals });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getVaccineDashboard(req,res){
    try {
      const vaccines = await vaccinesService.getAllVaccines();
      res.render("admin/vaccines", {vaccines});
      
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
