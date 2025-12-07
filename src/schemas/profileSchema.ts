import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string({ message: "Last name is required" })
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.email({ message: "Please enter a valid email address" }),
  username: z
    .string({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
