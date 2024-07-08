import { FastifyRequest } from "fastify";
import { prisma } from "../config/conection";
import { WebSocket } from "ws"; 

interface MyQueryParams {
    id: string;
}
class WsChatController {
    async  create(socket:WebSocket, req:FastifyRequest) {
        socket.emit('message', 'Connection established with server');
        socket.on('message', async (message:string) => {
            // message.toString() === 'hi from client'
            console.log(message.toString())
            const todolist = await prisma.todoList.findFirst();
            const {id} = req.query as MyQueryParams;
            
            socket.send("Voce acessou a rota de mensagem + id " + id)
        });
        socket
    }
}
export default new WsChatController