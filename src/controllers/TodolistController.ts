import { FastifyReply, FastifyRequest } from "fastify";


//create index show update delete
class TodolistController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        return { message: 'Perfil do usuário' };
    }
    async index(request: FastifyRequest, reply: FastifyReply) {
        return { message: 'Perfil do usuário' };
    }
    async show(request: FastifyRequest, reply: FastifyReply) {
        return { message: 'Perfil do usuário' };
    }
    async update(request: FastifyRequest, reply: FastifyReply) {
        return { message: 'Perfil do usuário' };
    }
    async delete(request: FastifyRequest, reply: FastifyReply) {
        return { message: 'Perfil do usuário' };
    }
}
export default new TodolistController()