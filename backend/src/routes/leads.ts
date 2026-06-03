import { Router } from "express";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10)
});

export const leadsRouter = Router();

leadsRouter.post("/", (req, res) => {
  const result = leadSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos del formulario no validos",
      errors: result.error.flatten()
    });
  }

  // Replace this with email, CRM, database, or webhook integration.
  console.info("Nuevo contacto recibido", result.data);

  return res.status(201).json({
    message: "Solicitud recibida correctamente"
  });
});

