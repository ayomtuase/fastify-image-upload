import { FastifyInstance } from 'fastify';

import fastifyPlugin from 'fastify-plugin';
// import auth from './auth';
import uploadImage from './uploadImage';

// const getOptionsWithPrefix = (options: FastifyPluginOptions, prefix: string) => {
// 	return {
// 		...options,
// 		prefix: options.prefix + prefix,
// 	};
// };

export default fastifyPlugin(async (fastify: FastifyInstance) => {
	fastify.get('/api/health', async () => {
		return { status: 'OK' };
	});

	await fastify.register(uploadImage, { prefix: '/api' });
});
