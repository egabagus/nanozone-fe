import { z } from "zod";

export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
});