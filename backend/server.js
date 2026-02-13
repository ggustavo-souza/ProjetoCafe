import Fastify from 'fastify';
import { userRoutes } from './routes/userRoutes.ts';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: '*',
});

fastify.register(userRoutes);

fastify.listen({ port: 3000 }, err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log('Server listening on http://localhost:3000');
});
