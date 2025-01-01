import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  LOG_LEVEL: z.string().default('info'),
});

export default envSchema.parse(process.env);
