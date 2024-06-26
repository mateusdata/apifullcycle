import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../config/conection";
import bcrypt from "bcrypt";


class AuthController {
    async create(request: FastifyRequest, reply: FastifyReply) {

        // Aqui você pode autenticar o usuário, verificar credenciais, etc.
        const loginSchema = z.object({
            email: z.string().email().max(150),
            password: z.string().max(50),
        });

        const { email, password } = loginSchema.parse(request.body);

        const user = await prisma.user.findFirst({
            where: {
                email: email,

            }

        })

        if (!user) {
            throw new Error("Usuarios não encontrado");
        }
        const passwordHash = await bcrypt.compare(password, String(user?.password))
        if (passwordHash) {
            // Criação do token JWT
            const token = jwt.sign({ id: user?.user_id }, "123", { expiresIn: "1m" });

            // Exemplo de resposta com o token
            reply.send({ token });
        } else {
            reply.status(401).send({ error: "Credenciais inválidas" });
        }
    }


}
export default new AuthController()