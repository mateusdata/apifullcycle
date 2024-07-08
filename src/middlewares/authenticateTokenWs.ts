import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export default async function authenticateTokenWs(request: FastifyRequest) {
  const { headers } = request;
  const tokenHeader = headers['authorization'];

  if (!tokenHeader) {
    throw new Error('Access Unauthorized');
  }

  const token = tokenHeader.split(" ")[1];
  try {
    jwt.verify(token, "123", (err, decode) => {
      if (err) {
        throw new Error('Token is invalid or expired');
      }
    });
  } catch (error) {
    throw new Error('Internal error');
  }
}
