import z from "zod";

export const LoginFormInputSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
