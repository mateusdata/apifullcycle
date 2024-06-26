import fastify from 'fastify'
import connectDatabase from './config/conection';
import todolistRoutes from './routes/todolistRoutes';
import authRoute from './routes/authRoutes';
import fastifyExpress from '@fastify/express';
import fastifyRateLimit from '@fastify/rate-limit';
const PORT = process.env.PORT || 3000;
const ADDRESS = '0.0.0.0';

const app = fastify({
    bodyLimit: 1024 * 1024 * 5,
    trustProxy: true,
    logger: true,

});

connectDatabase()

app.register(fastifyRateLimit), {
    max: 100,
    timeWindow: '1 minute',
}

app.register(fastifyRateLimit, { global: true, max: 20, timeWindow: 1000 *60 })

app.register(fastifyExpress);


app.get('/', async (request, reply) => {
    return reply.send({ name: "apifullcycle" });
});

app.register(todolistRoutes);
app.register(authRoute)

app.listen({ host: ADDRESS, port: Number(PORT) }).then(() => {
    console.log(`HTTP server running on port ${PORT}`);
});