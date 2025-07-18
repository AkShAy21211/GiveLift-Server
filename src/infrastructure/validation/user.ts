import Joi from "joi";

export const stateCoordinatorSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 30 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10 digits",
    }),

  district: Joi.string().min(2).max(50).required().messages({
    "string.empty": "district is required",
    "string.min": "district must be at least 2 characters",
  }),
});

export const createUser = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 30 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),

  role: Joi.string()
    .required()
    .messages({
      "any.only": "Role is required",
      "string.empty": "Role is required",
    })
    .optional(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10 digits",
    })
    .optional(),
  district: Joi.string().min(2).max(50).required().messages({
    "string.empty": "City is required",
    "string.min": "City must be at least 2 characters",
  }),
  isVolunteer: Joi.boolean().required().messages({
    "boolean.empty": "Volunteer status is required",
  }),
});

export const updateUser = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 30 characters",
    })
    .optional(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
    })
    .optional(),

  role: Joi.string()
    .required()
    .messages({
      "any.only": "Role is required",
      "string.empty": "Role is required",
    })
    .optional(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10 digits",
    })
    .optional(),

  district: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "City is required",
      "string.min": "City must be at least 2 characters",
    })
    .optional(),
  isVolunteer: Joi.boolean()
    .required()
    .messages({
      "boolean.empty": "Volunteer status is required",
    })
    .optional(),
});
