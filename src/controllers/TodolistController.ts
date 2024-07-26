import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../config/conection";
import { z } from "zod";

//create index show update delete
class TodolistController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        return reply.send("1")
        const todoListSchema = z.object({
            title: z.string(),
            description: z.string()
        })
        const { title, description } = todoListSchema.parse(request?.body)

        try {
            const todoList = await prisma.todoList.create({
                data: {
                    title: title,
                    description: description
                }

            })
            return reply.status(201).send(todoList)
        } catch (error) {
            return reply.status(500).send({ message: "Ocorreu um erro no servidor" });
        }

    }


    async index(request: FastifyRequest, reply: FastifyReply) {

        try {
            const todoList = await prisma.todoList.findMany()
            return reply.send(todoList);
        } catch (error) {
            console.log(error);
            
            return reply.status(500).send({ message: "Ocorreu um erro no servidor" });
        }

    }

    async show(request: FastifyRequest, reply: FastifyReply) {

        const { id }: any = request?.params;
        try {
            const todoList = await prisma.todoList.findMany({
                where: {
                    id: Number(id)
                }
            })
            return reply.send(todoList);
        } catch (error) {
            return reply.status(500).send({ message: "Ocorreu um erro no servidor" });
        }
    }
    async update(request: FastifyRequest, reply: FastifyReply) {

        const todoListSchema = z.object({
            title: z.string().optional(),
            description: z.string().optional()
        })
        const { id }: any = request.params

        const {title, description} = todoListSchema.parse(request?.body)

        try {

            const todoList = await prisma.todoList.update({
                where: { id: Number(id) },
                data: {
                    title: title,
                    description: description
                }

            })

            return reply.status(200).send(todoList)
        } catch (error) {
            return reply.status(500).send({ message: "Ocorreu um erro no servidor" });
        }

    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id }: any = request.params
        try {
            const todoList = await prisma.todoList.delete({
                where: {
                    id: Number(id)
                }
            })
            reply.status(204).send(todoList)
        } catch (error) {
            return reply.status(500).send({ message: "Ocorreu um erro no servidor" });
        }
    }



    async deleteAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const todoList = await prisma.todoList.deleteMany()
            reply.status(204).send(todoList)
        } catch (error) {
            return reply.status(500).send({ message: "Ocorreu um erro no servidor" });
        }
    }
}
export default new TodolistController()