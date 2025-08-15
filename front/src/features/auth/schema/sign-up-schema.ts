import type { TFunction } from "i18next";
import { z } from "zod"


export const createSignUpSchema = (t: TFunction<'auth/errors', undefined>) => {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  return z.object({

    //EMAIL
    email:
      z.email({ message: t('validation.email.invalid') }),

    //PASSWORD
    password:
      z.string({ message: t('validation.password.invalid') })
        .min(8, { message: t('validation.password.minLength') })
        .regex(regexPassword, { message: t('validation.password.invalid') }),

    //CONFIRM PASSWORD
    confirmPassword:
      z.string({ message: t('validation.confirmPassword.invalid') })
        .min(8, { message: t('validation.confirmPassword.minLength') })
        .regex(regexPassword, { message: t('validation.confirmPassword.invalid') }),
  })  
  
  // CUSTOM VALIDATION
  .refine((data) => data.password === data.confirmPassword, {
     message: t('validation.confirmPassword.notEqual'),
  })

}

