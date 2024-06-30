import fastify from 'fastify'
import connectDatabase from './config/conection';
import todolistRoutes from './routes/todolistRoutes';
import authRoute from './routes/authRoutes';
import fastifyExpress from '@fastify/express';
import fastifyRateLimit from '@fastify/rate-limit';
import { envConfig } from './config/envConfig';
const PORT = envConfig.PORT || 3000;
const HOST = envConfig.HOST;

const app = fastify({
    bodyLimit: 1024 * 1024 * 5,
    trustProxy: true,
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: true,
                ignore: 'pid,hostname,reqId,res,req'
            }
        }
    }

});

connectDatabase()

app.register(fastifyRateLimit, { global: true, max: 100, timeWindow: 1000 * 60, })

app.register(fastifyExpress);


app.get('/', async (request, reply) => {
    return reply.send({ name: "apifullcycle" });
});

app.register(todolistRoutes);
app.register(authRoute)
console.log(typeof envConfig.PORT)
app.listen({ host: HOST, port: PORT });