import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
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
    rePassword: zod.string().nonempty("rePassword is required"),
    dateOfBirth: zod.coerce.date("Date is required").refine((value) => {
      const userAge = value.getFullYear();
      const now = new Date().getFullYear();
      const diff = now - userAge;
      return diff >= 18;
    }, "Age less that 18"),
    gender: zod.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password and rePassword don't Match",
  });
