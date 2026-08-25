import 'dotenv/config';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import crypto from 'crypto';

const mp = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN! });
const payment = new Payment(mp);

function isValidCPF(cpf: string): boolean {
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(10, 11))) return false;

    return true;
}

class PaymentController {
    //criar pagamento do pix
    public async createQRcode(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { total, cpf } = request.body as { total: number; cpf: string };
            
            if (!cpf || !isValidCPF(cpf)) {
                return reply.code(400).send({
                    message: "CPF inválido ou não fornecido.",
                    success: false
                });
            }

            const cleanCpf = cpf.replace(/\D/g, '');

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
                        number: cleanCpf,
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

    //consultar status do pagamento
    public async paymentStatus(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { paymentId } = request.params as { paymentId: string };
            const data = await payment.get({ id: paymentId });
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


