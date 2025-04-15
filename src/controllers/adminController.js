const userService = require("../services/userService");
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
};

module.exports = adminController;
