const userService = require("../services/userService"); // Use seu service de usuário
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer"); // Criamos isso no passo 3
const prisma = require('../config/database');
require("dotenv").config()


const authController = {
  
  showLoginPage(req, res) {
    res.render("auth/login", { error: null });
  },

  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.render("auth/login", { error: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcrypt.compare(senha, user.password);

      if (!senhaCorreta) {
        return res.render("auth/login", { error: "Senha incorreta" });
      }

      // Se estiver usando JWT ou Sessions, aqui é onde você cria a sessão
      req.session.user = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      res.redirect("/dashboard"); // Redireciona para o painel principal
    } catch (error) {
      res.render("auth/login", { error: "Erro ao realizar login: " + error.message });
    }
  },

  showRecoverPage(req, res) {
    res.render("auth/recuperar-senha", { message: null, error: null });
  },

  async recoverPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.render("auth/recuperar-senha", {
          error: "E-mail não encontrado.",
          message: null,
        });
      }

      // Gerar um token simples (pode usar UUID ou JWT com tempo curto)
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      const resetLink = `${process.env.BASE_URL}/redefinir-senha?token=${token}`;

      // Envia e-mail
      await transporter.sendMail({
        from: '"Moovox" <no-reply@moovox.com>',
        to: user.email,
        subject: "Recuperação de Senha",
        html: `<p>Olá ${user.name},</p>
               <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
               <p><a href="${resetLink}">Redefinir Senha</a></p>
               <p>Este link expira em 1 hora.</p>`,
      });

      res.render("auth/recuperar-senha", {
        message: "Link de recuperação enviado para o seu e-mail.",
        error: null,
      });
    } catch (error) {
      res.render("auth/recuperar-senha", {
        error: "Erro ao enviar link de recuperação: " + error.message,
        message: null,
      });
    }
  },
  showResetPasswordForm(req, res) {
    const token = req.query.token;
  
    if (!token) {
      return res.status(400).send('Token inválido ou ausente');
    }
  
    res.render('auth/redefinirSenha', { token });
  },
  async resetPassword(req, res) {
    const token = req.params.token;
    const { senha, confirmarSenha } = req.body;
  
    if (senha !== confirmarSenha) {
      return res.status(400).send("As senhas não coincidem.");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      const hashedPassword = await bcrypt.hash(senha, 10);
  
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
  
      res.redirect("/login");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      res.status(400).send("Token inválido ou expirado.");
    }
  }
};

module.exports = authController;
