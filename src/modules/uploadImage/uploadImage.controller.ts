import { MultipartFile } from '@fastify/multipart';
import { FastifyReply, FastifyRequest } from 'fastify';
import UploadImageService from './uploadImage.service';

export default class UploadImageController {
	private uploadImageService: UploadImageService;

	constructor(uploadImageService: UploadImageService) {
		this.uploadImageService = uploadImageService;
	}

	public async uploadImageHandler(
		request: FastifyRequest<{ Body: { file: MultipartFile } }>,
		reply: FastifyReply,
	) {
		try {
			const image = await request.file();

			if (!image) {
				return reply.code(400).send({ message: 'No file uploaded.' });
			}

			if (!image.mimetype.startsWith('image/')) {
				return reply.code(400).send({ message: 'Uploaded file is not an image.' });
			}

			const status = await this.uploadImageService.uploadImage(image);
			if (!status) {
				return reply.code(400).send({ message: 'Image upload failed' });
			}

			return reply.code(201).send({ message: 'Image uploaded successfully' });
		} catch (e) {
			if (e instanceof Error) {
				return reply.badRequest(e.message);
			}

			throw e;
		}
	}
}
