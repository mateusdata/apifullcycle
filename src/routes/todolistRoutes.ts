import { FastifyInstance } from 'fastify';
import TodolistController from '../controllers/TodolistController';

export default async function todolistRoutes(fastify: FastifyInstance) {

  fastify.post('/todolist', TodolistController.create);
  fastify.get('/todolist', TodolistController.index);
  fastify.get('/todolist/:id', TodolistController.show);
  fastify.put('/todolist', TodolistController.update);
  fastify.delete('/todolist', TodolistController.delete);
}
