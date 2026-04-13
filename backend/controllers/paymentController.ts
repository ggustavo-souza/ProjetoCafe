import 'dotenv/config';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const mp = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN! });
const payment = new Payment(mp);

class PaymentController {
    public async createQRcode(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { total } = request.body as { total: number };
            const body = {
                transaction_amount: total,
                description: "Pagamento do pedido",
                payment_method_id: "pix",
                payer: {
                    email: "[EMAIL_ADDRESS]",
                    identification: {
                        type: "CPF",
                        number: "12345678909",
                    },
                },
            };
            const data = await payment.create({ body });
            return reply.code(200).send({ data, success: true });
        } catch (error) {
            return reply.code(500).send({ message: `Erro interno no Servidor em relação ao Mercado Pago ${error}`, success: false });
        }
    }
}

export const paymentController = new PaymentController();


