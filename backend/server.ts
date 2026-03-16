import Fastify from 'fastify';
import { userRoutes } from './routes/userRoutes.ts';
import { cardapioRoutes } from './routes/cardapioRoutes.ts'
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*',
});

fastify.register(userRoutes);
fastify.register(cardapioRoutes);

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
