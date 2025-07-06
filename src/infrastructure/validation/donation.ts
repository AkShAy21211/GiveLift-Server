import Joi from "joi";

export const donationSchema = Joi.object({
  resourceType: Joi.string()
    .required()
    .messages({
      'any.only': "Please select a resource type",
      'any.required': "Please select a resource type",
      'string.base': "Resource type must be a string"
    }),

  quantity: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.min': "Quantity is required",
      'string.base': "Quantity must be a string",
      'any.required': "Quantity is required"
    }),

  address: Joi.string()
    .min(10)
    .required()
    .messages({
      'string.min': "Address must be at least 10 characters",
      'string.base': "Address must be a string",
      'any.required': "Address is required"
    }),

  note: Joi.string().optional().messages({
    'string.base': "Note must be a string"
  }),
});
