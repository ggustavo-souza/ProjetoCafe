import 'dotenv/config';
import type { FastifyRequest, FastifyReply } from 'fastify';

const chaveUser = process.env.CHAVE_USER;

class UserController {

    public async loginUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            console.log("tentativa com a chave", chaveUser)
            const { chave } = request.body as any;
            if (chave === chaveUser) {
                return reply.code(200).send({ message: "lógica do controller executada com sucesso!", success: true })
            } else {
                return reply.code(400).send({message: "a chave está incorreta!", success: false})
            }
        } catch(error) {
            return reply.code(500).send({message: "Erro interno", success: false})
        }
    }
}

export const userController = new UserController();