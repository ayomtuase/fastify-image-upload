import { MultipartFile } from '@fastify/multipart';
import { pipeline } from 'stream';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const pump = promisify(pipeline);

export default class UploadImageService {
	public async uploadImage(image: MultipartFile | undefined): Promise<boolean> {
		if (!image) {
			return false;
		}

		const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, image.filename);
		await pump(image.file, fs.createWriteStream(filePath));

		console.log(`Image uploaded to ${filePath}`);
		return true;
	}
}
