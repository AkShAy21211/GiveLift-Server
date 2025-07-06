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

  address: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Address is required",
    "string.min": "Address must be at least 5 characters",
  }),

  city: Joi.string().min(2).max(50).required().messages({
    "string.empty": "City is required",
    "string.min": "City must be at least 2 characters",
  }),

  state: Joi.string().min(2).max(50).required().messages({
    "string.empty": "State is required",
    "string.min": "State must be at least 2 characters",
  }),

  country: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Country is required",
    "string.min": "Country must be at least 2 characters",
  }),

  pincode: Joi.string()
    .pattern(/^[0-9]{5,6}$/)
    .required()
    .messages({
      "string.empty": "Pincode is required",
      "string.pattern.base": "Pincode must be 5 or 6 digits",
    }),

  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Gender must be one of 'male', 'female', or 'other'",
    "string.empty": "Gender is required",
  }),

  dob: Joi.date().less("now").iso().required().messages({
    "date.base": "Date of birth must be a valid date",
    "date.less": "Date of birth must be in the past",
    "any.required": "Date of birth is required",
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
    .valid("coordinator")
    .required()
    .messages({
      "any.only": "Role must be 'coordinator'",
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

  state: Joi.string().min(2).max(50).required().messages({
    "string.empty": "State is required",
    "string.min": "State must be at least 2 characters",
  }),

  country: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Country is required",
    "string.min": "Country must be at least 2 characters",
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
    .valid("coordinator")
    .required()
    .messages({
      "any.only": "Role must be 'coordinator'",
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

  state: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "State is required",
      "string.min": "State must be at least 2 characters",
    })
    .optional(),

  country: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Country is required",
      "string.min": "Country must be at least 2 characters",
    })
    .optional(),
});
