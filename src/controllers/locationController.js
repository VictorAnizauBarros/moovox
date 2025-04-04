const locationService = require("../services/locationService");

const locationController = {
  async getAllLocations(req, res) {
    try {
      const locations = await locationService.getAllLocations();
      res.json({
        message: "Localizações encontradas com sucesso:",
        locations: locations,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar localizações",
        error: error.message,
      });
    }
  },
  async getLocationById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const location = await locationService.getLocationById(id);
      res.json({
        message: "Localização encontrada com sucesso:",
        location: location,
      });
    } catch (error) {
      res.status(404).json({
        message: "Localização não encontrada",
        error: error.message,
      });
    }
  },
  async createLocation(req, res) {
    try {
        const {animal_id, latitude, longitude} = req.body; 
      const location = await locationService.createLocation(animal_id,latitude,longitude);
      res.json({
        message: "Localização criada com sucesso:",
        location: location,
      });
    } catch (error) {
      res.status(400).json({
        message: "Erro ao criar localização",
        error: error.message,
      });
    }
  },
  async updateLocation(req, res) {
    try {
      const id = parseInt(req.params.id);
      const {animal_id, latitude, longitude} = req.body;
      const location = await locationService.updateLocation(id,animal_id,latitude,longitude);
      res.json({
        message: "Localização atualizada com sucesso:",
        location: location,
      });
    } catch (error) {
      res.status(404).json({
        message: "Localização não encontrada",
        error: error.message,
      });
    }
  },
  async deleteLocation(req, res) {
    try {
      const id = parseInt(req.params.id);
      await locationService.deleteLocation(id);
      res.json({
        message: "Localização deletada com sucesso",
      });
    } catch (error) {
      res.status(404).json({
        message: "Localização não encontrada",
        error: error.message,
      });
    }
  },
};

module.exports = locationController; 
