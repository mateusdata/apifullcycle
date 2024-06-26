import { FastifyReply, FastifyRequest } from 'fastify';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export default async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
  const { headers } = request;
  const tokenHeader = headers['authorization'];

  if (!tokenHeader) {
    return reply.status(403).send("Access Unauthorized");
  }

  const token = tokenHeader.split(" ")[1];
  try {

    jwt.verify(token, "123", (err:any, decode:any) => {

      if (err) {
        return reply.status(401).send({ message: "Token is invalid or expired" });
      }

      //next
     
    });


  } catch {

    return reply.status(500).send({ message: "Internal erorr", token });
  }
}
