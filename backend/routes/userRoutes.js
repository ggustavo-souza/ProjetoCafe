import { ROUTES } from "../constants/routes.js";

export async function userRoutes(fastify, options) {
  
  fastify.get(ROUTES.AUTH.LOGIN, async (request, reply) => {
    return { message: 'conexao ok'};
  });

  fastify.post(ROUTES.AUTH.LOGIN, async (request, reply) => {
    const { user } = request.body;
    return { message: `Usuário ${user} autenticado com sucesso!` };
  });
}








