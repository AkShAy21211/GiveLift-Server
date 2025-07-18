import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Phone is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),

  district: Joi.string().required().messages({
    "string.empty": "District is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "string.empty": "Confirm password is required",
  }),

  token: Joi.string().required().messages({
    "string.empty": "Token is required",
  }),
});
