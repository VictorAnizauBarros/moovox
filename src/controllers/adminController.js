const userService = require("../services/userService");
const animalsService = require("../services/animalService");
const vaccinesService = require("../services/vaccineService"); 
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
  }
};

module.exports = adminController;
