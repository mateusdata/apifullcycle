import { FastifyReply, FastifyRequest } from 'fastify';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export default async function auth(request: FastifyRequest, reply: FastifyReply) {
  const { headers, query }:any = request;
  const tokenHeader = query['authorization'];
  console.warn(tokenHeader)

  if (!tokenHeader) {
    return reply.status(403).send("Access Unauthorized");
  }

  try {

    jwt.verify(tokenHeader, "123", (err:any, decode:any) => {

      if (err) {
        return reply.status(401).send({ message: "Token is invalid or expired" });
      }

      //next
      console.dir(tokenHeader)
     
    });


  } catch {

    return reply.status(500).send({ message: "Internal erorr", tokenHeader });
  }
}
