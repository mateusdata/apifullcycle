import fastify from 'fastify'
import connectDatabase from './config/conection';
import todolistRoutes from './routes/todolistRoutes';

const app = fastify({
    bodyLimit: 900
})
connectDatabase()
app.get('/', async (request, reply) => {
    
    return reply.send({data:10});
});

app.register(todolistRoutes)

app.listen({ port: 3001 }).then(() => {
    console.log('HTTP server running on port 3333');
});