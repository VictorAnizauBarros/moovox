const applicationService = require("../services/applicationService");

const applicationController = {
  async getAllApplications(req, res) {
    try {
      const applications = await applicationService.getAllApplications();
      res.json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching applications" });
    }
  },
  async getApplicationById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const application = await applicationService.getApplicationById(id);
      res.json(application);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Application not found" });
    }
  },
  async createApplication(req, res) {
    try {
      const {
        animal_id,
        vaccine_id,
        veterinario_id,
        application_date,
        status,
      } = req.body;
      const application = await applicationService.createApplication(
        animal_id,
        vaccine_id,
        veterinario_id,
        application_date,
        status,
      );
      res.json(application);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Invalid application data" });
    }
  },
  async updateApplication(req, res) {
    try {
      const id = parseInt(req.params.id);
      const {
        animal_id,
        vaccine_id,
        veterinario_id,
        application_date,
        status,
      } = req.body;
      const application = await applicationService.updateApplication(
        id,
        animal_id,
        vaccine_id,
        veterinario_id,
        application_date,
        status
      );
      res.json(application);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Application not found" });
    }
  },
  async deleteApplication(req,res){
    try {
        const id = parseInt(req.params.id);
        await applicationService.deleteApplication(id);
        res.json({ message: "Application deleted successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Application not found" });
        
    }
  }
};

module.exports = applicationController; 
