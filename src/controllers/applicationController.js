// Importa o serviço de aplicações de vacinas
const applicationService = require("../services/applicationService");

// Objeto controller que agrupa todos os métodos relacionados às aplicações de vacinas
const applicationController = {

  /**
   * Retorna todas as aplicações registradas no sistema.
   *
   * @async
   * @function getAllApplications
   * @param {import('express').Request} req - Objeto da requisição HTTP.
   * @param {import('express').Response} res - Objeto da resposta HTTP com a lista de aplicações.
   * @returns {Promise<void>} - Retorna JSON com as aplicações ou erro 500.
   */
  async getAllApplications(req, res) {
    try {
      const applications = await applicationService.getAllApplications();
      res.json(applications);
    } catch (error) {
      console.error("Erro ao buscar aplicações:", error);
      res.status(500).json({ message: "Erro ao buscar aplicações" });
    }
  },

  /**
   * Retorna uma aplicação específica com base no ID informado.
   *
   * @async
   * @function getApplicationById
   * @param {import('express').Request} req - Objeto da requisição HTTP com o ID da aplicação.
   * @param {import('express').Response} res - Objeto da resposta HTTP com os dados da aplicação.
   * @returns {Promise<void>} - Retorna JSON da aplicação ou erro 404.
   */
  async getApplicationById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const application = await applicationService.getApplicationById(id);
      res.json(application);
    } catch (error) {
      console.error("Erro ao buscar aplicação por ID:", error);
      res.status(404).json({ message: "Aplicação não encontrada" });
    }
  },

  /**
   * Cria uma nova aplicação de vacina no sistema com base nos dados recebidos.
   *
   * @async
   * @function createApplication
   * @param {import('express').Request} req - Objeto da requisição HTTP com os dados da nova aplicação.
   * @param {import('express').Response} res - Objeto da resposta HTTP.
   * @returns {Promise<void>} - Redireciona para o dashboard ou retorna erro 400.
   */
  async createApplication(req, res) {
    try {
      const {
        animal_id,
        vaccine_id,
        veterinario_id,
        application_date,
        next_application_date,
        status,
      } = req.body;

      await applicationService.createApplication(
        parseInt(animal_id),
        parseInt(vaccine_id),
        parseInt(veterinario_id),
        application_date,
        next_application_date || null,
        status
      );

      res.redirect("/admin/applications");
    } catch (error) {
      console.error("Erro ao criar aplicação:", error);
      res.status(400).json({ message: "Dados inválidos para criação de aplicação" });
    }
  },

  /**
   * Atualiza uma aplicação existente com os novos dados fornecidos.
   *
   * @async
   * @function updateApplication
   * @param {import('express').Request} req - Objeto da requisição HTTP com o ID e os novos dados.
   * @param {import('express').Response} res - Objeto da resposta HTTP.
   * @returns {Promise<void>} - Redireciona ou retorna erro 404.
   */
  async updateApplication(req, res) {
    try {
      const id = parseInt(req.params.id);
      const {
        animal_id,
        vaccine_id,
        veterinario_id,
        application_date,
        next_application_date,
        status,
      } = req.body;

      await applicationService.updateApplication(
        id,
        parseInt(animal_id),
        parseInt(vaccine_id),
        parseInt(veterinario_id),
        application_date,
        next_application_date || null,
        status
      );

      res.redirect("/admin/applications");
    } catch (error) {
      console.error("Erro ao atualizar aplicação:", error);
      res.status(404).json({ message: "Aplicação não encontrada" });
    }
  },

  /**
   * Remove uma aplicação do sistema com base no ID fornecido.
   *
   * @async
   * @function deleteApplication
   * @param {import('express').Request} req - Objeto da requisição HTTP com o ID da aplicação.
   * @param {import('express').Response} res - Objeto da resposta HTTP.
   * @returns {Promise<void>} - Redireciona ou retorna erro 404.
   */
  async deleteApplication(req, res) {
    try {
      const id = parseInt(req.params.id);
      await applicationService.deleteApplication(id);
      res.redirect("/admin/applications");
    } catch (error) {
      console.error("Erro ao deletar aplicação:", error);
      res.status(404).json({ message: "Aplicação não encontrada" });
    }
  }
};

// Exporta o controller para ser usado nas rotas
module.exports = applicationController;
