import { z } from "zod"

export const signUpSchema = z.object({

  //EMAIL
  email:
    z.email({ message: "email string" }),

  //PASSWORD
  password:
    z.string({ message: "password string" })
      .min(8, { message: "password trop court" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: "password regex" }),

  //CONFIRM PASSWORD
  confirmPassword:
    z.string({ message: "confirm password string" })
      .min(8, { message: "confirm password trop court" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: "confirm password regex" }),

})

  // CUSTOM VALIDATION
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les 2 mots de passe ne correspondent pas.",
  })
