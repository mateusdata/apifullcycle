import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../config/conection";
import { z } from 'zod';

class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {

        const schema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        })
        const { name, email, password } = schema.parse(request.body)
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword

    }

    async index(request: FastifyRequest, reply: FastifyReply) { }

    async show(request: FastifyRequest, reply: FastifyReply) { }

    async update(request: FastifyRequest, reply: FastifyReply) { }

    async delete(request: FastifyRequest, reply: FastifyReply) { }

    async deleteAll(request: FastifyRequest, reply: FastifyReply) { }
}
export default new UserController()