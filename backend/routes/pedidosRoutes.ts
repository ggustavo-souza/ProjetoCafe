import { ROUTES } from "../constants/routes";
import { FastifyInstance } from "fastify";
import { pedidosController } from "../controllers/pedidosController"


export async function pedidosRoutes(fastify: FastifyInstance) {
    //criar pedido
    fastify.post(ROUTES.PEDIDOS.CREATE, async (request, reply) => {
        return pedidosController.createPedido(request, reply);
    });

    // listar pedidos
    fastify.get(ROUTES.PEDIDOS.LIST, async (request, reply) => {
        return pedidosController.listarPedidos(request, reply);
    });
}