import Joi from "joi";

export const addressValidator = Joi.object({
  coord: Joi.array().items(Joi.number()).required().messages({
    "array.base": "Coordinates must be an array of numbers",
    "array.required": "Coordinates are required",
  }),
  cityL: Joi.string().required().messages({
    "string.required": "City is required",
  }),
  district: Joi.string()
    .required()
    .messages({
      "string.required": "District is required",
    })
    .optional(),
});

export const userCreateValidator = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a 10-digit number",
      "any.required": "Phone is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
  address: addressValidator,
  role: Joi.string().valid("user", "admin", "coordinator").required().messages({
    "any.only": 'Role must be "user" or "admin" or "coordinator" ',
    "any.required": "Role is required",
  }),
});

export const userLoginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "any.min": "Password must be at least 6 characters",
  }),
});

export const forgetPasswordDtoValidator = Joi.object({
  phone: Joi.string().min(10).required().messages({
    "string.required": "Phone is required",
    "string.min": "Phone must be at least 10 characters",
  }),
});
