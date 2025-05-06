// Importa o cliente Prisma do pacote @prisma/client
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do cliente Prisma com configurações personalizadas
const prisma = new PrismaClient({
  // Formata os erros de forma mais legível
  errorFormat: 'pretty',
});

// Exporta a instância do cliente Prisma para uso em outros módulos
module.exports = prisma;