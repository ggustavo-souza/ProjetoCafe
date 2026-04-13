import { ROUTES } from "../constants/routes.js";
import type { FastifyInstance } from 'fastify';
import 'dotenv/config';
import { paymentController } from "../controllers/paymentController.ts";


export async function paymentRoutes(fastify: FastifyInstance) {
    //gerar qrcode
    fastify.post(ROUTES.PAYMENT.QRCODE, async (request, reply) => {
        return paymentController.createQRcode(request, reply);
    });
}








