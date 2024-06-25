import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export default async function connectDatabase() {
  try {
    // Tenta conectar ao banco de dados
    await prisma.$connect();
    console.log("Conexão com banco de dados realizada com sucesso.\n");
  } catch (e) {
    console.error("Erro ao conectar com o banco de dados:", e);
  } finally {
    // Garante que a desconexão ocorra, independentemente do resultado da conexão
    await prisma.$disconnect();
  }
}

