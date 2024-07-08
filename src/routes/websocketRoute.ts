import { FastifyInstance } from "fastify";
import { prisma } from "../config/conection";
import WsChatController from "../controllers/WsChatController";
import authenticateToken from "../middlewares/authenticateToken";

export default async function (app: FastifyInstance) {
    
    //app.addHook('preHandler', authenticateToken);
    app.register(async function (route) {
        route.get('/chat', { websocket: true }, WsChatController.create);
    });
    app.register(async function (route) {
        route.get('/tempo', { websocket: true }, WsChatController.create);
    })
   
}