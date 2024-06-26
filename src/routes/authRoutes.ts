import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import AuthController from "../controllers/AuthController";

export default async function authRoute(route: FastifyInstance) {
    route.post("/login", AuthController.create)
}
