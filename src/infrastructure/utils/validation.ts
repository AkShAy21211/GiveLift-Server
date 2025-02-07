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

export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(1).optional(),
  address: Joi.object({
    coord: Joi.array().items(Joi.number()).min(1).optional(),
    city: Joi.string().min(1).optional(),
    district: Joi.string().min(1).optional(),
    pinCode: Joi.number().optional(),
  }).optional(),
  isVolunteer: Joi.boolean().optional(),
});

export const disasterReportValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title is required.",
  }),

  description: Joi.string().required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
  }),

  type: Joi.string().required().messages({
    "string.base": "Type must be a string.",
    "string.empty": "Type is required.",
  }),

  location: Joi.object({
    type: Joi.string().valid("Point").required().messages({
      "any.only": "Location type must be 'Point'.",
      "string.base": "Location type must be a string.",
      "string.empty": "Location type is required.",
    }),

    coordinates: Joi.array()
      .items(
        Joi.number().messages({
          "number.base": "Each coordinate must be a number.",
        })
      )
      .length(2)
      .required()
      .messages({
        "array.base": "Coordinates must be an array of numbers.",
        "array.length":
          "Coordinates must contain exactly [longitude, latitude].",
        "any.required": "Coordinates are required.",
      }),

    district: Joi.string().required().messages({
      "string.base": "District must be a string.",
      "string.empty": "District is required.",
    }),

    city: Joi.string().required().messages({
      "string.base": "City must be a string.",
      "string.empty": "City is required.",
    }),

    pinCode: Joi.number().integer().required().messages({
      "number.base": "Pin Code must be a number.",
      "number.integer": "Pin Code must be an integer.",
      "any.required": "Pin Code is required.",
    }),
  })
    .required()
    .messages({
      "object.base": "Location must be an object.",
      "any.required": "Location is required.",
    }),


  severity: Joi.string()
    .valid("Low", "Medium", "High", "Critical")
    .required()
    .messages({
      "any.only":
        "Severity must be one of 'low', 'medium', 'high', or 'critical'.",
      "string.base": "Severity must be a string.",
      "any.required": "Severity is required.",
    }),

  status: Joi.boolean().required().messages({
    "boolean.base": "Status must be a boolean value.",
    "any.required": "Status is required.",
  }),

  media: Joi.array()
    .items(
      Joi.string()
        .uri()
        .messages({ "string.uri": "Each media must be a valid URL." })
    )
    .messages({
      "array.base": "Media must be an array of valid URLs.",
    }),
});
