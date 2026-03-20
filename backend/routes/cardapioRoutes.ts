import { ROUTES } from "../constants/routes";
import type { FastifyInstance } from 'fastify';
import 'dotenv/config';
import { cardapioController } from "../controllers/cardapioController.ts";

export async function cardapioRoutes(fastify: FastifyInstance) {
  //pegar todos
  fastify.get(ROUTES.CARDAPIO.LIST, async (request, reply) => {
      return cardapioController.getCardapio(request, reply);
  });
  // pegar um
  fastify.get(ROUTES.CARDAPIO.VIEW, async (request, reply) => {
    return cardapioController.getItem(request, reply);
  })
  // criar um
  fastify.post(ROUTES.CARDAPIO.CREATE, async (request, reply) => {
    return cardapioController.criarItem(request, reply);
  })
  // editar um
  fastify.put(ROUTES.CARDAPIO.EDIT, async (request, reply) => {
    return cardapioController.editarItem(request, reply);
  })
  //deletar um
  fastify.delete(ROUTES.CARDAPIO.DELETE, async (request, reply) => {
    return cardapioController.deletarItem(request, reply);
  })
  
}
