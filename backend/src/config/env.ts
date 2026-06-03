import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:4200")
});

export const env = envSchema.parse(process.env);

