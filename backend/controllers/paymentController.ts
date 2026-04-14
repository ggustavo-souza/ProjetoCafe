import 'dotenv/config';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import crypto from 'crypto';

const mp = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN! });
const payment = new Payment(mp);

class PaymentController {
    //criar pagamento do pix
    public async createQRcode(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { total } = request.body as { total: number };
            const body = {
                transaction_amount: Number(total),
                description: "Pagamento do pedido",
                payment_method_id: "pix",
                payer: {
                    email: "dummy_test_user@gmail.com",
                    first_name: "Test",
                    last_name: "User",
                    identification: {
                        type: "CPF",
                        number: "51014928842",
                    },
                },
            };
            const data = await payment.create({ body, requestOptions: { idempotencyKey: crypto.randomUUID() } });
            return reply.code(200).send({ data, success: true });
        } catch (error: any) {
            const errorMessage = error?.message || JSON.stringify(error);

            return reply.code(500).send({
                message: `Erro interno no Servidor: ${errorMessage}`,
                success: false
            });
        }
    }
}

export const paymentController = new PaymentController();


