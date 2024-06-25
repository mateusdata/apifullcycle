import fastify from 'fastify'
import connectDatabase from './config/conection';
import todolistRoutes from './routes/todolistRoutes';
const PORT = process.env.PORT || 3001;

const app = fastify({
    bodyLimit: 900
})
connectDatabase()
app.get('/', async (request, reply) => {
    
    return reply.send({name:"apifullcycle"});
});

app.register(todolistRoutes)

app.listen({ port:Number(PORT) }).then(() => {
    console.log(`HTTP server running on port ${PORT}`);
});