import { prisma } from './../config/conection';
import { FastifyInstance } from 'fastify';



export default async function sseRoute(app: FastifyInstance) {
    app.get('/events', (request, reply) => {
        reply.raw.setHeader('Content-Type', 'text/event-stream');
        reply.raw.setHeader('Cache-Control', 'no-cache');
        reply.raw.setHeader('Access-Control-Allow-Origin', '*');
        reply.raw.setHeader('Connection', 'keep-alive');
        reply.raw.flushHeaders();
    
        const intervalId = setInterval(async () => {
    
            const todolist = await prisma.todoList.count()
            const data = {
                nome: 'João Silva',
                email: 'joao.silva@example.com',
                organizacao: 'Empresa ABC',
                total: todolist
            };
            reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
        }, 200);
    
        reply.raw.on('close', () => {
            clearInterval(intervalId);
            reply.raw.end();
        });
    });
}
