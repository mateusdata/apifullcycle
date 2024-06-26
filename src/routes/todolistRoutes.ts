import { FastifyInstance } from 'fastify';
import TodolistController from '../controllers/TodolistController';

export default async function todolistRoutes(route: FastifyInstance) {

  route.post('/todolist', TodolistController.create);
  route.get('/todolist', TodolistController.index);
  route.get('/todolist/:id', TodolistController.show);
  route.put('/todolist/:id', TodolistController.update);
  route.delete('/todolist', TodolistController.deleteAll);
  route.delete('/todolist/:id', TodolistController.delete);

}
