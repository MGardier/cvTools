import type { TFunction } from "i18next";
import z from "zod";


 const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

/**************** SIGNUP *********************************************/

export const createSignUpSchema = (t: TFunction<'auth/errors', undefined>) => {
 

  return z.object({

    //EMAIL

    email:
      z.email({ message: t('errors.validation.email.invalid') }),

    //PASSWORD
    password:
      z.string({ message: t('errors.validation.password.invalid') })
        .min(8, { message: t('errors.validation.password.minLength') })
        .regex(REGEX_PASSWORD, { message: t('errors.validation.password.invalid') }),

    //CONFIRM PASSWORD
    confirmPassword:
      z.string({ message: t('errors.validation.confirmPassword.invalid') })
        .min(8, { message: t('errors.validation.confirmPassword.minLength') })
        .regex(REGEX_PASSWORD, { message: t('errors.validation.confirmPassword.invalid') }),
  })

    // CUSTOM VALIDATION
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.validation.confirmPassword.notEqual'),
    })

}




/****************  CONFIRM ACCOUNT *********************************************/

export const createSendConfirmAccountSchema = (t: TFunction<'auth/errors', undefined>) => {
  return z.object({
    //EMAIL
    email:
      z.email({ message: t('errors.validation.email.invalid') }),
  })
}



/**************** SIGNIN *********************************************/

export const createSignInSchema = (t: TFunction<'auth/errors', undefined>) => {
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
  })
}



/****************  RESET PASSWORD *********************************************/

export const createSendForgotPasswordSchema = (t: TFunction<'auth/errors', undefined>) => {
  return z.object({
    //EMAIL
    email:
      z.email({ message: t('errors.validation.email.invalid') }),
  })
}


export const createResetPasswordSchema = (t: TFunction<'auth/errors', undefined>) => {
  return z.object({
  
    password:
      z.string({ message: t('validation.password.invalid') })
        .min(8, { message: t('validation.password.minLength') })
        .regex(REGEX_PASSWORD, { message: t('validation.password.invalid') }),
  })
}



