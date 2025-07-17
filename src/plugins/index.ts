import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import config from './config';
import sensible from './sensible';
// import cookie from './cookie';
// import cors from './cors';
import swagger from './swagger';
// import redis from './redis';
import multipart from '@fastify/multipart';

export default fastifyPlugin(async (fastify: FastifyInstance) => {
	await Promise.all([fastify.register(config), fastify.register(sensible)]);

	await Promise.all([
		// fastify.register(cookie),
		// fastify.register(cors),
		// fastify.register(redis),
		fastify.register(multipart),
		fastify.register(swagger),
	]);
});
