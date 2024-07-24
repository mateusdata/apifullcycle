import swagger from '@fastify/swagger';
import { htmlContent } from './templates/htmlContent';
import fastify from 'fastify'
import connectDatabase, { prisma } from './config/conection';
import todolistRoutes from './routes/todolistRoutes';
import authRoute from './routes/authRoutes';
import fastifyExpress from '@fastify/express';
import fastifyRateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors'
import websocketRoute from './routes/websocketRoute';
import fastifyWebsocket from '@fastify/websocket';
import swaggerJson from "../swagger.json"

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = fastify({
    bodyLimit: 1024 * 1024 * 5,
    trustProxy: false,
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: false,
                ignore: 'pid,hostname,reqId,res,req'
            }
        }
    }

});
connectDatabase()

app.register(require('@fastify/swagger'))
app.register(require('@fastify/swagger-ui'), {
        
})
app.register(cors, {})
app.register(fastifyWebsocket);
app.register(fastifyRateLimit, { global: true, max: 100, timeWindow: 1000 * 60, })


const metricsPlugin = require('fastify-metrics');
app.register(metricsPlugin, { endpoint: '/metrics' });

app.register(todolistRoutes);
app.register(authRoute)
app.register(websocketRoute);



app.get('/', async (request, reply) => {
    return reply.type('text/html').send(htmlContent);
});

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

app.listen({ host: HOST, port: Number(PORT) });