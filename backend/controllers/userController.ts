import 'dotenv/config';
import type { FastifyRequest, FastifyReply } from 'fastify';

const chaveUser = process.env.CHAVE_USER;

class UserController {

    public async loginUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            console.log("tentando login de usuário relativo a chave", chaveUser)

            const { chaveUsuario } = request.body as any;
            console.log(chaveUsuario)

            if (chaveUsuario === chaveUser) {
                return reply.code(200).send({ message: "login realizado com sucesso", success: true })
            } else {
                return reply.code(400).send({ message: "a chave informada está incorreta", success: false })
            }

        } catch (error) {
            return reply.code(500).send({ message: "erro interno", success: false })
        }
    }
}

export const userController = new UserController();