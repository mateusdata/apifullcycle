import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function authRoute(route: FastifyInstance) {
    route.get("/t", async (request: FastifyRequest, reply: FastifyReply) => {
        return 10
    })
}