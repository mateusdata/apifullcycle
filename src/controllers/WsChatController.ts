import { FastifyRequest } from "fastify";
import { prisma } from "../config/conection";
import { WebSocket } from "ws"; 
import authenticateTokenWs from "../middlewares/authenticateTokenWs";

interface MyQueryParams {
    id: string;
}
class WsChatController {
    async  create(socket:WebSocket, request:FastifyRequest) {
        const { headers } = request;
        const tokenHeader = headers['authorization'];
        try {
            await authenticateTokenWs(request);
            socket.send('Connection established with server');
        } catch (error:any) {
            socket.send(error);
            socket.close();
            return;
        }
        socket.emit('message', 'Connection established with server');
        socket.on('message', async (message:string) => {
            // message.toString() === 'hi from client'
            console.log(message.toString())
            const todolist = await prisma.todoList.findFirst();
            const {id} = request.query as MyQueryParams;
            console.log(tokenHeader);
            
            socket.send("Voce acessou a rota de mensagem + id " + id)
        });
        socket
    }
}
export default new WsChatController