import 'dotenv/config';
import type { FastifyRequest, FastifyReply } from 'fastify';

const chaveAdmin = process.env.CHAVE_ADM;

class AdminController {
    public async loginAdmin(request: FastifyRequest, reply: FastifyReply) {
        try {
            console.log("tentando login de admin relativo a chave", chaveAdmin)

            const { chave } = request.body as any;
            console.log(chave)
            
            if (chave === chaveAdmin) {
                return reply.code(200).send({message: "login realizado com sucesso", success: true})
            } else {
                return reply.code(400).send({message: "a chave informada está incorreta", success: false})
            }

        } catch (error) {
            return reply.code(500).send({message: "erro interno", success: false})
        }
    }
}

export const adminController = new AdminController;