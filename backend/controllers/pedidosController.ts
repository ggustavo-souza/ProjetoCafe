import { FastifyRequest, FastifyReply } from "fastify";
import { pedidosBd } from "../database/pedidosBd";

class PedidosController {
    public async createPedido(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { total, metodo, itens, mesa } = request.body as { total: number, metodo: string, itens: any[], mesa: string | null };
            
            const dadosPedido = {
                total,
                formaPagamento: metodo,
                mesaNumero: mesa ? parseInt(mesa.replace(/\D/g, ''), 10) || 0 : 0,
                status: 'Aprovado',
            };

            const response = await pedidosBd.createPedido(dadosPedido, itens);
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