import * as zod from "zod";

export const schema = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "At least 8 characters, one letter & one number"
    ),
});
