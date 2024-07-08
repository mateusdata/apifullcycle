import fastify from 'fastify'
import connectDatabase, { prisma } from './config/conection';
import todolistRoutes from './routes/todolistRoutes';
import authRoute from './routes/authRoutes';
import fastifyExpress from '@fastify/express';
import fastifyRateLimit from '@fastify/rate-limit';
import { envConfig } from './config/envConfig';
import cors from '@fastify/cors'
import websocketRoute from './routes/websocketRoute';
import fastifyWebsocket from '@fastify/websocket';

const PORT = envConfig.PORT || 3000;
const HOST = envConfig.HOST;

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

app.register(cors, {})
connectDatabase()
app.register(fastifyWebsocket);
app.register(websocketRoute);

app.register(fastifyRateLimit, { global: true, max: 100, timeWindow: 1000 * 60, })
app.register(fastifyExpress);
app.get('/s', async (request, reply) => {
    return reply.send({ name: "apifullcycle v 1.0.0" });
});
app.register(todolistRoutes);
app.register(authRoute)
console.log(typeof envConfig.PORT)

app.listen({ host: HOST, port: PORT });