// Importa o cliente Prisma do pacote @prisma/client
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do cliente Prisma com configurações personalizadas
const prisma = new PrismaClient({
  // Formata os erros de forma mais legível
  errorFormat: 'pretty',
  // Define os níveis de log que devem ser exibidos
  log: ['query', 'info', 'warn', 'error'],
});

// Exporta a instância do cliente Prisma para uso em outros módulos
module.exports = prisma;