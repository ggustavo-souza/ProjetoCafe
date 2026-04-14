import { ROUTES } from "../constants/routes";
import { FastifyInstance } from "fastify";
import { pedidosController } from "../controllers/pedidosController"


export async function pedidosRoutes(fastify: FastifyInstance) {
    //criar pedidio
    fastify.post(ROUTES.PEDIDOS.CREATE, async (request, reply) => {
        return pedidosController.createPedido(request, reply);
    });
}