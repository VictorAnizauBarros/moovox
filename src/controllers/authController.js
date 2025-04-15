// Importação de módulos necessários
const userService = require("../services/userService"); // Serviço que lida com operações do usuário
const bcrypt = require("bcryptjs"); // Biblioteca para criptografar e comparar senhas
const jwt = require("jsonwebtoken"); // Biblioteca para criar e verificar tokens JWT
const transporter = require("../config/mailer"); // Configuração do serviço de envio de e-mails

// Configuração de variáveis de ambiente (como JWT_SECRET, BASE_URL)
require("dotenv").config();

// Definição do controlador de autenticação
const authController = {
  // Método para renderizar a página de login
  async getLogin(req, res) {
    // Verifica se o usuário já está logado
    if (req.session.user) {
      const role = req.session.user.role;
      // Redireciona o usuário para o dashboard correspondente ao seu papel
      switch (role) {
        case "admin":
          res.redirect("/dashboard/admin");
          break;
        case "fazendeiro":
          res.redirect("/dashboard/fazendeiro");
          break;
        case "veterinario":
          res.redirect("/dashboard/veterinario");
          break;
        case "funcionario":
          res.redirect("/dashboard/funcionario");
          break;
        default:
          res.redirect("/login");
      }
    } else {
      try {
        // Renderiza a página de login com a variável 'error' nula
        res.render("auth/login", { error: null });
      } catch (error) {
        // Em caso de erro ao renderizar, envia uma mensagem de erro
        console.error("Erro ao renderizar página de login");
        res.status(500).send({
          message: "Erro ao renderizar a página de login" + error.message,
        });
      }
    }
  },

  // Método para processar o login do usuário
  async postLogin(req, res) {
    // Obtém os dados do corpo da requisição
    const { email, password } = req.body;
    try {
      // Tenta logar usando o service
      const user = await userService.login(email, password);

      // Cria a sessão com as informações do usuário
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      // Redireciona o usuário para o dashboard com base no papel
      switch (user.role) {
        case "admin":
          res.redirect("/dashboard/admin");
          break;
        case "fazendeiro":
          res.redirect("/dashboard/fazendeiro");
          break;
        case "veterinario":
          res.redirect("/dashboard/veterinario");
          break;
        case "funcionario":
          res.redirect("/dashboard/funcionario");
          break;
        default:
          res.redirect("/login");
      }
    } catch (error) {
      // Se ocorrer erro no login (senha incorreta, usuário não encontrado etc.)
      res.render("auth/login", {
        error: error.message,
      });
    }
  },

  // Método para exibir o formulário de recuperação de senha
  async getRecoverPassword(req, res) {
    try {
      // Renderiza a página de recuperação de senha sem mensagens
      res.render("auth/recuperar-senha", { message: null, error: null });
    } catch (error) {
      // Em caso de erro, exibe a mensagem na mesma tela
      console.log(
        "Erro ao renderizar página de recuperação de senha: " + error.message
      );
      res.render("auth/recuperar-senha", {
        message: null,
        error: error.message,
      });
    }
  },

  // Método que processa o envio do e-mail de recuperação de senha
  async postRecoverPassword(req, res) {
    const { email } = req.body; // Pega o email informado pelo usuário

    try {
      // Busca o usuário no banco de dados pelo e-mail
      const user = await userService.getUserByEmail(email);

      // Caso não encontre o usuário, exibe erro
      if (!user) {
        return res.render("auth/recuperar-senha", {
          error: "Email não encontrado",
          message: null,
        });
      }

      // Gera um token JWT contendo os dados do usuário e validade de 1 hora
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Monta o link para redefinir a senha
      const resetLink = `${process.env.BASE_URL}/redefinir-senha?token=${token}`;

      // Envia o e-mail com o link para o usuário
      await transporter.sendMail({
        from: '"MOOVOX" <no-reply@moovox.com>',
        to: user.email,
        subject: "Recuperação de Senha - Moovox",
        html: `<p>Olá, ${user.name}!</p>
        <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir a sua senha:</p>
        <p><a href="${resetLink}">Redefinir Senha</a></p>
        <p>Este link expira em 1 hora.</p>`,
      });

      // Exibe mensagem de sucesso na tela
      res.render("auth/recuperar-senha", {
        message: "Email de recuperação de senha enviado com sucesso!",
        error: null,
      });
    } catch (error) {
      // Em caso de erro, exibe mensagem na tela
      console.log(
        "Erro ao enviar email de recuperação de senha: " + error.message
      );
      res.render("auth/recuperar-senha", {
        error: "Erro ao enviar email de recuperação de senha" + error.message,
        message: null,
      });
    }
  },

  // Método para exibir o formulário de redefinição de senha com base no token
  async getResetPasswordForm(req, res) {
    const token = req.query.token; // Pega o token da URL

    // Se não houver token, mostra erro
    if (!token) {
      return res.status(400).send("Token inválido ou ausente.");
    }
    try {
      // Renderiza o formulário de redefinição de senha, passando o token
      res.render("auth/redefinir-senha", { token, message: null, error: null });
    } catch (error) {
      console.log(
        "Erro ao renderizar formulário de recuperação de senha: " +
          error.message
      );
      res.render("auth/redefinir-senha", {
        error:
          "Erro ao renderizar formulário de recuperação de senha: " +
          error.message,
        message: null,
      });
    }
  },

  // Método que processa a redefinição da senha
  async postResetPassword(req, res) {
    const token = req.params.token; // Token vindo da URL
    const { password, confirmPassword } = req.body; // Novas senhas do formulário

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      return res.render("auth/redefinir-senha", {
        error: "As senhas não coincidem.",
        message: null,
      });
    }

    try {
      // Verifica se o token é válido e não expirou
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decoded.id;

      // Chama o serviço para atualizar a senha
      await userService.changePassword(userID, password);

      // Redireciona o usuário para a tela de login após alterar a senha
      res.redirect("/login");
    } catch (error) {
      // Se o token for inválido ou tiver expirado, exibe erro
      console.error("Erro ao redefinir senha:", error);
      res.render("auth/redefinir-senha", {
        error: "Token inválido ou expirado.",
        message: null,
      });
    }
  },
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log("Erro ao encerrar sessão:", err);
        return res.status(500).send({ message: "Erro ao encerrar sessão" });
      }
      res.clearCookie("session-id");
      res.redirect("/login");
    });
  },
};

// Exporta o controlador para ser usado em rotas
module.exports = authController;
