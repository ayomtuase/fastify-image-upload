import { FastifyInstance } from 'fastify';
import UploadImageController from './uploadImage.controller';
import { $ref } from './uploadImage.schema';
import UploadImageService from './uploadImage.service';

export default async (fastify: FastifyInstance) => {
	const uploadImageController = new UploadImageController(new UploadImageService());

	fastify.post(
		'/upload-image',
		{
			schema: {
				consumes: ['multipart/form-data'],
				tags: ['UploadImage'],
				body: {
					type: 'object',
					properties: {
						file: {
							type: 'string',
							format: 'binary',
						},
					},
					required: ['file'],
				},
				response: {
					201: $ref('uploadImageResponseSchema'),
				},
			},
			validatorCompiler: () => {
				return () => true;
			},
		},
		uploadImageController.uploadImageHandler.bind(uploadImageController),
	);
};
