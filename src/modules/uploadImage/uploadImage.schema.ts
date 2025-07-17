import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const uploadImageSchema = z.object({
	file: z.any(),
});

const uploadImageResponseSchema = z.object({ message: z.string() });

export const { schemas: uploadImageSchemas, $ref } = buildJsonSchemas(
	{
		uploadImageSchema,
		uploadImageResponseSchema,
	},
	{
		$id: 'uploadImageSchemas',
	},
);

export type UploadImageInput = z.infer<typeof uploadImageSchema>;
