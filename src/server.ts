import { htmlContent } from './templates/htmlContent';
import fastify from 'fastify';
import connectDatabase, { prisma } from './config/conection';
import todolistRoutes from './routes/todolistRoutes';
import authRoute from './routes/authRoutes';
import fastifyExpress from '@fastify/express';
import fastifyRateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import websocketRoute from './routes/websocketRoute';
import fastifyWebsocket from '@fastify/websocket';
import axios from 'axios';
import fs from 'fs';
import pino from 'pino';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const logDir = './logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = pino({
    level: 'info',
    base: null,
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    translateTime: 'yyyy-mm-dd HH:MM:ss',
                    ignore: 'pid,hostname,reqId,res,req'
                }
            },
            {
                target: 'pino/file',
                options: {
                    destination: `${logDir}/app.log`
                }
            }
        ]
    }
});

const app = fastify({
    bodyLimit: 1024 * 1024 * 5,
    trustProxy: false,
    logger: logger
});

app.register(cors, {});
app.register(fastifyWebsocket);
app.register(websocketRoute);

const metricsPlugin = require('fastify-metrics');
app.register(metricsPlugin, { endpoint: '/metrics' });

app.register(fastifyRateLimit, {
    global: true,
    max: 100,
    timeWindow: 1000 * 60,
});

app.register(fastifyExpress);

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
        const todolistCount = await prisma.todoList.count();
        const data = {
            nome: 'João Silva',
            email: 'joao.silva@example.com',
            organizacao: 'Empresa ABC',
            total: todolistCount
        };
        reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 200);

    reply.raw.on('close', () => {
        clearInterval(intervalId);
        reply.raw.end();
    });
});

app.register(todolistRoutes);
app.register(authRoute);

app.listen({ host: HOST, port: Number(PORT) }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on http://${HOST}:${PORT}`);
});
