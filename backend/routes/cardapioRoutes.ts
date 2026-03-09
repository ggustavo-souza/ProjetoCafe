import { ROUTES } from "../constants/routes";
import type { FastifyInstance } from 'fastify';
import 'dotenv/config';
import { cardapioController } from "../controllers/cardapioController.ts";

export async function cardapioRoutes(fastify: FastifyInstance) {

  fastify.get(ROUTES.CARDAPIO.LIST, async (request, reply) => {
      return cardapioController.getCardapio(request, reply);
  });
  
}
