import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import TodolistController from '../controllers/TodolistController';
import { prisma } from '../config/conection';
import authenticateToken from '../middlewares/authenticateToken';
import UserController from '../controllers/UserController';
import auth from '../middlewares/auth';

export default async function todolistRoutes(route: FastifyInstance) {
  // Middleware para verificar o token de autenticação
  route.addHook('preHandler', authenticateToken);

  // Rotas do controlador Todolist
  //route.get('/todolist', { preHandler: auth }, TodolistController.index);
  
  route.post('/todolist', TodolistController.create);
  route.get('/todolist', TodolistController.index);
  route.get('/todolist/:id', TodolistController.show);
  route.put('/todolist/:id', TodolistController.update);
  route.delete('/todolist', TodolistController.deleteAll);
  route.delete('/todolist/:id', TodolistController.delete);


  route.post('/users', UserController.create);

}
