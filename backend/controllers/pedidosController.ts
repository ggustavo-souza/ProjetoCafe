import { FastifyRequest, FastifyReply } from "fastify";
import { pedidosBd } from "../database/pedidosBd";

class PedidosController {
    public async createPedido(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { total, formaPagamento, items } = request.body as { total: number, formaPagamento: string, items: any[] };
            const response = await pedidosBd.createPedido({ total, formaPagamento, items });
            if (response) {
                return reply.status(200).send({ message: "Pedido criado com sucesso" });
            }
            return reply.status(500).send({ error: "Erro ao criar pedido" });
        } catch (error) {
            console.log(error, "Erro ao criar pedido")
            return reply.status(500).send({ error: "Erro ao criar pedido" });
        }
    }
}

export const pedidosController = new PedidosController();