// Importa o módulo 'nodemailer', que permite o envio de e-mails usando node.js
const nodemailer = require("nodemailer");

// Cria um transportador (transporter), que é o objeto responsável por enviar os e-mails
const transporter = nodemailer.createTransport({
  // Define o serviço de e-mail utilizado. Pode ser 'gmail', 'outlook', entre outros
  service: "gmail", 

  // Configura a autenticação com o servidor de e-mail
  auth: {
    // Usuário da conta de e-mail (normalmente um endereço de e-mail), vindo de uma varíavel de ambiente
    user: process.env.EMAIL_USER,
    // Senha da conta de e-mail, também vinda de uma variável de ambiente (recomendado por segurança)
    pass: process.env.EMAIL_PASS,
  },
});

// Exporta o transportador
module.exports = transporter;
