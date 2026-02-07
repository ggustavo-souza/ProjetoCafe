import { ROUTES } from "../constants/routes.js";
import 'dotenv/config';

const chaveAdmin = process.env.CHAVE_ADM;
const chaveUser = process.env.CHAVE_USER

export async function userRoutes(fastify, options) {

  fastify.post(ROUTES.ADMIN.LOGIN, async (request, reply) => {
    const { chave } = request.body;
    if (chave === chaveAdmin) {
      return { success: true, cargo: 'administrador' };
    } else {
      return { message: 'A chave digitada está incorreta!' };
    }
  });

  fastify.post(ROUTES.USER.LOGIN, async (request, reply) => {
    const { chaveUsuario } = request.body;
    if (chaveUsuario === chaveUser) {
      return { success: true, cargo: 'usuario' }
    } else {
      return { message: `${chaveUsuario} e ${chaveUser}` }
    }
  });
}








