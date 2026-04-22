import Fastify from 'fastify';
import { userRoutes } from './routes/userRoutes.ts';
import { cardapioRoutes } from './routes/cardapioRoutes.ts'
import { paymentRoutes } from './routes/paymentRoutes.ts'
import { pedidosRoutes } from './routes/pedidosRoutes.ts'
import cors from '@fastify/cors';
import fastifyStatic from "@fastify/static";
import path from 'node:path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fastify = Fastify({ logger: true });

fastify.register(cors, {
    origin: '*',
    methods: 'GET, PUT, DELETE, POST'
});

fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    prefix: '/public/'
})

fastify.register(userRoutes);
fastify.register(cardapioRoutes);
fastify.register(paymentRoutes);
fastify.register(pedidosRoutes);

fastify.listen({
    port: 3000,
    host: '0.0.0.0',
}, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log('Server listening on http://localhost:3000');
});
