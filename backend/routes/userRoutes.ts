import { ROUTES } from "../constants/routes.js";
import type { FastifyInstance } from 'fastify';
import 'dotenv/config';
import { userController } from "../controllers/userController.ts";
import { adminController } from "../controllers/adminController.ts";


export async function userRoutes(fastify: FastifyInstance) {

  fastify.post(ROUTES.ADMIN.LOGIN, async (request, reply) => {
      return adminController.loginAdmin(request, reply);
  });

  fastify.post(ROUTES.USER.LOGIN, async (request, reply) => {
      return userController.loginUser(request, reply);
  });
}








