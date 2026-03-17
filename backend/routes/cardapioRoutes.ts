import { ROUTES } from "../constants/routes";
import type { FastifyInstance } from 'fastify';
import 'dotenv/config';
import { cardapioController } from "../controllers/cardapioController.ts";

export async function cardapioRoutes(fastify: FastifyInstance) {

  fastify.get(ROUTES.CARDAPIO.LIST, async (request, reply) => {
      return cardapioController.getCardapio(request, reply);
  });

  fastify.get(ROUTES.CARDAPIO.VIEW, async (request, reply) => {
    return cardapioController.getItem(request, reply);
  })

  fastify.post(ROUTES.CARDAPIO.CREATE, async (request, reply) => {
    return cardapioController.criarItem(request, reply);
  })

  fastify.put(ROUTES.CARDAPIO.EDIT, async (request, reply) => {
    return cardapioController.editarItem(request, reply);
  })

  
}
