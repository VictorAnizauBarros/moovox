/**
 * Módulo de controle de telemetria.
 *
 * Este módulo é responsável por gerenciar as requisições relacionadas à telemetria,
 * incluindo a criação, leitura, atualização e exclusão de telemetrias.
 */

const telemetryService = require("../services/telemetryService");

/**
 * Controlador de telemetria.
 *
 * Este objeto contém as funções que lidam com as requisições de telemetria.
 */
const telemetryController = {
  /**
   * Obtem todas as telemetrias.
   *
   * Esta função é responsável por obter todas as telemetrias registradas no sistema.
   *
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   */
  async getAllTelemetrys(req, res) {
    try {
      // Obtem todas as telemetrias do serviço de telemetria.
      const telemetrys = await telemetryService.getAllTelemetrys();
      // Retorna as telemetrias encontradas com sucesso.
      return res.status(200).json({
        message: "Telemetrias encontradas com sucesso.",
        data: telemetrys,
      });
    } catch (error) {
      // Retorna um erro caso ocorra algum problema ao buscar as telemetrias.
      return res.status(500).json({
        message: "Erro ao buscar telemetrias",
        error: error.message,
      });
    }
  },

  /**
   * Obtem uma telemetria por ID.
   *
   * Esta função é responsável por obter uma telemetria específica pelo seu ID.
   *
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   */
  async getTelemetryById(req, res) {
    try {
      // Obtem o ID da telemetria da requisição.
      const id = parseInt(req.params.id);
      // Verifica se o ID é válido.
      if (isNaN(id)) {
        // Retorna um erro caso o ID seja inválido.
        return res.status(400).json({
          message: "Id inválido",
          error: "Id deve ser um número",
        });
      }
      // Obtem a telemetria do serviço de telemetria.
      const telemetry = await telemetryService.getTelemetryById(id);
      // Verifica se a telemetria foi encontrada.
      if (!telemetry) {
        // Retorna um erro caso a telemetria não seja encontrada.
        return res.status(404).json({
          message: "Telemetria não encontrada",
          error: "Telemetria não encontrada",
        });
      }
      // Retorna a telemetria encontrada com sucesso.
      return res.status(200).json({
        message: "Telemetria encontrada com sucesso.",
        data: telemetry,
      });
    } catch (error) {
      // Retorna um erro caso ocorra algum problema ao buscar a telemetria.
      return res.status(500).json({
        message: "Erro ao buscar telemetria.",
        error: error.message,
      });
    }
  },

  /**
   * Cria uma nova telemetria.
   *
   * Esta função é responsável por criar uma nova telemetria no sistema.
   *
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   */
  async createTelemetry(req, res) {
    try {
      // Obtem os dados da telemetria da requisição.
      const { animal_id, heartbeat, temperature, activity_level } = req.body;
      // Verifica se os dados são válidos.
      if (!animal_id || !heartbeat || !temperature || !activity_level) {
        // Retorna um erro caso os dados sejam inválidos.
        return res.status(400).json({
          message: "Dados inválidos",
          error: "Todos os campos são obrigatórios",
        });
      }
      const animalId = parseInt(animal_id);
      if (isNaN(animalId)) {
        return res.status(400).json({
          message: "animal_id inválido",
          error: "animal_id deve ser um número",
        });
      }
      if (
        typeof heartbeat !== "number" ||
        typeof temperature !== "number" ||
        typeof activity_level !== "number"
      ) {
        return res.status(400).json({
          message: "Dados inválidos",
          error: "heartbeat, temperature e activity_level devem ser numéricos",
        });
      }
      // Cria a telemetria no serviço de telemetria.
      const telemetry = await telemetryService.createTelemetry(
        animal_id,
        heartbeat,
        temperature,
        activity_level
      );
      // Retorna a telemetria criada com sucesso.
      return res.status(201).json({
        message: "Telemetria criada com sucesso.",
        data: telemetry,
      });
    } catch (error) {
      // Retorna um erro caso ocorra algum problema ao criar a telemetria.
      return res.status(500).json({
        message: "Erro ao criar telemetria",
        error: error.message,
      });
    }
  },

  /**
   * Atualiza uma telemetria.
   *
   * Esta função é responsável por atualizar uma telemetria existente no sistema.
   *
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   */
  async updateTelemetry(req, res) {
    try {
      // Obtem o ID da telemetria da requisição.
      const id = parseInt(req.params.id);
      // Verifica se o ID é válido.
      if (isNaN(id)) {
        // Retorna um erro caso o ID seja inválido.
        return res.status(400).json({
          message: "Id inválido",
          error: "Id deve ser um número",
        });
      }
      // Obtem os dados da telemetria da requisição.
      const { animal_id, heartbeat, temperature, activity_level } = req.body;
      // Verifica se os dados são válidos.
      if (!animal_id || !heartbeat || !temperature || !activity_level) {
        // Retorna um erro caso os dados sejam inválidos.
        return res.status(400).json({
          message: "Dados inválidos",
          error: "Todos os campos são obrigatórios",
        });
      }
      // Atualiza a telemetria no serviço de telemetria.
      const telemetry = await telemetryService.updateTelemetry(
        id,
        animal_id,
        heartbeat,
        temperature,
        activity_level
      );
      // Verifica se a telemetria foi encontrada.
      if (!telemetry) {
        // Retorna um erro caso a telemetria não seja encontrada.
        return res.status(404).json({
          message: "Telemetria não encontrada",
          error: "Telemetria não encontrada",
        });
      }
      // Retorna a telemetria atualizada com sucesso.
      return res.status(200).json({
        message: "Telemetria atualizada com sucesso.",
        data: telemetry,
      });
    } catch (error) {
      // Retorna um erro caso ocorra algum problema ao atualizar a telemetria.
      return res.status(404).json({
        message: "Telemetria não encontrada",
        error: error.message,
      });
    }
  },

  /**
   * Deleta uma telemetria.
   *
   * Esta função é responsável por deletar uma telemetria existente no sistema.
   *
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   */
  async deleteTelemetry(req, res) {
    try {
      // Obtem o ID da telemetria da requisição.
      const id = parseInt(req.params.id);
      // Verifica se o ID é válido.
      if (isNaN(id)) {
        // Retorna um erro caso o ID seja inválido.
        return res.status(400).json({
          message: "Id inválido",
          error: "Id deve ser um número",
        });
      }
      // Deleta a telemetria no serviço de telemetria.
      const telemetry = await telemetryService.deleteTelemetry(id);
      // Verifica se a telemetria foi encontrada.
      if (!telemetry) {
        // Retorna um erro caso a telemetria não seja encontrada.
        return res.status(404).json({
          message: "Telemetria não encontrada",
          error: "Telemetria não encontrada",
        });
      }
      // Retorna a telemetria deletada com sucesso.
      return res.status(200).json({
        message: "Telemetria deletada com sucesso.",
      });
    } catch (error) {
      // Retorna um erro caso ocorra algum problema ao deletar a telemetria.
      return res.status(404).json({
        message: "Telemetria não encontrada",
        error: error.message,
      });
    }
  },
};

module.exports = telemetryController;
