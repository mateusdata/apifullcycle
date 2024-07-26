import metricsPlugin from 'fastify-metrics';
import { htmlContent } from './templates/htmlContent';
import fastify from 'fastify'
import connectDatabase, { prisma } from './config/conection';
import todolistRoutes from './routes/todolistRoutes';
import authRoute from './routes/authRoutes';
import fastifyExpress from '@fastify/express';
import fastifyRateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors'
import fastifyWebsocket from '@fastify/websocket';
import websocketRoute from './routes/websocketRoute';
import sseRoute from './routes/sseRoute';


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

app.register(cors, {})
app.register(fastifyWebsocket);
//app.register(fastifyRateLimit, { global: true, max: 100, timeWindow: 1000 * 60, })


app.register(metricsPlugin, { endpoint: '/metrics' });

//Registrando grupos de rotas
app.register(todolistRoutes);
app.register(authRoute)
app.register(websocketRoute);
app.register(sseRoute);

app.get('/', async (request, reply) => {
    return reply.type('text/html').send(htmlContent);
});



app.listen({ host: HOST, port: Number(PORT) });