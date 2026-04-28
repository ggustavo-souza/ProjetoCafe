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
                status: 'PENDENTE',
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
    public async listarPedidos(request: FastifyRequest, reply: FastifyReply) {
        try {
            const response = await pedidosBd.listarPedidos();
            return reply.status(200).send(response);
        } catch (error) {
            console.log(error, "Erro ao listar pedidos")
            return reply.status(500).send({ error: "Erro ao listar pedidos" });
        }
    }
    public async atualizarStatusPedido(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: string };
            const { status } = request.body as { status: string };
            const response = await pedidosBd.updateStatusPedido(parseInt(id), status);
            if (response) {
                return reply.status(200).send({ message: "Status do pedido atualizado com sucesso" });
            }
            return reply.status(500).send({ error: "Erro ao atualizar status do pedido" });
        } catch (error) {
            console.log(error, "Erro ao atualizar status do pedido")
            return reply.status(500).send({ error: "Erro ao atualizar status do pedido" });
        }
    }
}

export const pedidosController = new PedidosController();