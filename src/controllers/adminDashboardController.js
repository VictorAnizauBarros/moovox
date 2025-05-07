// Importa os serviços usados para interagir com as entidades do sistema
const userService = require("../services/userService");
const animalsService = require("../services/animalService");
const vaccinesService = require("../services/vaccineService"); 
const vetService = require('../services/vetService');
const applicationService = require('../services/applicationService');

// Função auxiliar para obter o usuário atualmente logado, com base na sessão
async function getLoggedUser(req) {
  const id = parseInt(req.session.user.id); // Pega o ID do usuário logado na sessão
  return await userService.getUserById(id); // Busca os dados completos do usuário
}

// Objeto controller que agrupa todos os métodos da dashboard administrativa
const adminController = {

/**
 * Renderiza o painel principal do administrador com dados agregados do sistema.
 *
 * Obtém o usuário logado e, em paralelo, coleta estatísticas gerais como
 * número total de usuários, animais cadastrados, doses pendentes, últimos usuários,
 * e as últimas doses pendentes para exibir no dashboard principal.
 *
 * @async
 * @function getAdminDashboard
 * @param {import('express').Request} req - Objeto da requisição HTTP, contendo a sessão do usuário.
 * @param {import('express').Response} res - Objeto da resposta HTTP, usado para renderizar a view.
 * @returns {Promise<void>} - Renderiza a view 'admin/dashboard' ou envia erro 500 em caso de falha.
 */
  async getAdminDashboard(req, res) {
    try {
      const user = await getLoggedUser(req); // Usuário logado

      // Executa várias consultas em paralelo para obter os dados do dashboard
      const [totalUsers, totalAnimals, pending_doses, lastThreeUsers, lastThreePendingDoses] = await Promise.all([
        userService.countUsers(), // Total de usuários
        animalsService.countAnimals(), // Total de animais 
        applicationService.countPendentApplication(), // Total de doses pendentes 
        userService.getLastThreeUsers(), // Últimos 3 usuários cadastrados
        applicationService.getLastThreePendingDoses() // Últimas três doses pendentes para administração
      ]);

      res.render("admin/dashboard",{
        totalUsers,
        totalAnimals, 
        pending_doses,
        lastThreeUsers, 
        lastThreePendingDoses: lastThreePendingDoses,
        user
      });
    } catch (error) {
      console.log("Erro ao carregar dashboard do admin:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

/**
 * Renderiza o dashboard de gerenciamento de usuários para o administrador.
 *
 * Aplica filtros opcionais de busca (`search`) e função (`role`) passados pela query string
 * para exibir uma lista filtrada de usuários cadastrados no sistema.
 *
 * @async
 * @function getUsersDashboard
 * @param {import('express').Request} req - Objeto da requisição HTTP, contendo a sessão e query string.
 * @param {import('express').Response} res - Objeto da resposta HTTP, usado para renderizar a view.
 * @returns {Promise<void>} - Renderiza a view 'admin/users' com os usuários ou envia erro 500.
 */
  async getUsersDashboard(req, res) {
    try {
      const user = await getLoggedUser(req); 
      const { search, role } = req.query; // Filtros passados pela query string 
      const users = await userService.getAllUsers({ search, role }); // Busca os usuários com base nos filtros


      res.render("admin/users", { users,
        search,
        query: { role }, // Mantém o filtro de role no formulário
        user
       });
    } catch (error) {
      console.log("Erro ao carregar dashboard de usuários" + error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

/**
 * Renderiza o dashboard de gerenciamento de animais para o administrador.
 *
 * Aplica filtros opcionais da query string como nome (`search`), espécie (`species`),
 * raça (`breed`) e estado de saúde (`health_status`) para exibir os animais cadastrados.
 *
 * @async
 * @function getAnimalsDashboard
 * @param {import('express').Request} req - Objeto da requisição HTTP, contendo a sessão e query string.
 * @param {import('express').Response} res - Objeto da resposta HTTP, usado para renderizar a view.
 * @returns {Promise<void>} - Renderiza a view 'admin/animals' com os animais ou envia erro 500.
 */
  async getAnimalsDashboard(req, res) {
    try {
      const user = await getLoggedUser(req);
      // Extrai e organiza os filtros da query string
      const filters = (({search,species,breed,health_status}) => ({search,species,breed,health_status}))(req.query);
  
      const animals = await animalsService.getAllAnimalsWithDetails(filters); // Busca os animais com os filtros


      res.render("admin/animals", {
        ...filters, // Espalha os filtros na view 
        animals,
        user
      });
    } catch (error) {
      console.error("Erro ao carregar dashboard de animais:", error);
      res.status(500).send("Erro interno do servidor");
    }
  },

  /**
 * Renderiza o dashboard de gerenciamento de vacinas para o administrador.
 *
 * Aplica filtros opcionais passados via query string como nome (`search`), tipo (`type`),
 * doença-alvo (`target_disease`) e data de validade (`expiration_date`) para exibir
 * uma lista de vacinas filtradas.
 *
 * @async
 * @function getVaccineDashboard
 * @param {import('express').Request} req - Objeto da requisição HTTP, contendo a sessão e os filtros na query string.
 * @param {import('express').Response} res - Objeto da resposta HTTP, usado para renderizar a view.
 * @returns {Promise<void>} - Renderiza a view 'admin/vaccines' com as vacinas filtradas ou envia erro 500.
 */
  async getVaccineDashboard(req, res) {
    try {
      const user = await getLoggedUser(req); 
      // Extrai e organiza os filtros da query string
      const filters = (({search,type,target_disease,expiration_date}) => ({search,type,target_disease,expiration_date}))(req.query);

      const vaccines = await vaccinesService.getFilteredVaccines(filters); // Busca as vacinas com os filtros
      
      // Renderiza a view 'admin/vaccines' com os dados coletados
      res.render("admin/vaccines", {
        ...filters, // Espalha os filtros na view
        vaccines,
        user
      });
  
    } catch (error) {
      console.log("Erro ao carregar dashboard de vacinas: " + error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  /**
 * Renderiza o dashboard de gerenciamento de aplicações de vacinas para o administrador.
 *
 * Coleta, em paralelo, dados como vacinas cadastradas, animais registrados, veterinários disponíveis,
 * todas as aplicações realizadas e aplicações filtradas conforme os parâmetros passados na query string.
 * Os filtros podem incluir campos como vacina, animal, veterinário, data, entre outros.
 *
 * @async
 * @function getApplicationDashboard
 * @param {import('express').Request} req - Objeto da requisição HTTP, contendo a sessão do usuário e filtros opcionais na query string.
 * @param {import('express').Response} res - Objeto da resposta HTTP, usado para renderizar a view.
 * @returns {Promise<void>} - Renderiza a view 'admin/applications' com os dados coletados ou envia erro 500 em caso de falha.
 */
  async getApplicationDashboard(req, res) {
    try {
      const user = await getLoggedUser(req);

      // Executa várias consultas em paralelo para carregar dados da dashboard de aplicações
      const [vaccines, animals, veterinarios, applications, filteredApplications] = await Promise.all([
        vaccinesService.getAllVaccines(),
        animalsService.getAllAnimals(),
        vetService.getAllVets(),
        applicationService.getAllApplications(), // Lista completa de aplicações 
        applicationService.getFilteredApplications(req.query) // Aplicações com filtros
      ]);

      res.render("admin/applications", {
        applications,
        filteredApplications,
        vaccines,
        animals,
        veterinarios,
        query: req.query,
        user
      });
  
    } catch (error) {
      console.log(error); 
      res.status(500).send({ message: "Internal server error" });
    }
  }, 

/**
 * Renderiza o perfil do administrador atualmente logado.
 *
 * Obtém os dados completos do usuário autenticado a partir da sessão
 * e os envia para a view de perfil.
 *
 * @async
 * @function getProfileDashboard
 * @param {import('express').Request} req - Objeto da requisição HTTP, contendo a sessão do usuário.
 * @param {import('express').Response} res - Objeto da resposta HTTP, usado para renderizar a view.
 * @returns {Promise<void>} - Renderiza a view 'admin/profile' com os dados do usuário ou envia erro 500.
 */
  async getProfileDashboard(req,res){
    try {
      const user = await getLoggedUser(req);  

      // Renderiza a view 'admin/profile' com os dados coletados
      res.render("admin/profile", {
        user, // Passa os dados do usuário para a view
      }); 
    } catch (error) {
      console.log(error); 
      res.status(500).send({message: "Internal Error"})
      
    }
  }
};

// Exporta o controller para ser usado nas rotas 
module.exports = adminController;
