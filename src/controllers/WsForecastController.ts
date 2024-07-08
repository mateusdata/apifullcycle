import { FastifyRequest } from "fastify";
import { prisma } from "../config/conection";
import { WebSocket } from "ws"; // Importe o WebSocket do pacote 'ws'

class WsForecastController {
    async  create(socket:WebSocket, req:FastifyRequest) {
        socket.emit('message', 'Connection established with server');
        socket.on('message', async (message:string) => {
            // message.toString() === 'hi from client'
            console.log(message.toString())
            socket.send("Voce acessou a rota de precisão do tempo")
        });
        socket
    }
}
export default new WsForecastController