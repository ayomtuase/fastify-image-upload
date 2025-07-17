import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import fastifyPlugin from 'fastify-plugin';
import uploadImageRoute from './uploadImage.route';
import { uploadImageSchemas } from './uploadImage.schema';

export default fastifyPlugin(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
	for (const schema of uploadImageSchemas) {
		fastify.addSchema(schema);
	}
	await fastify.register(uploadImageRoute, options);
});
