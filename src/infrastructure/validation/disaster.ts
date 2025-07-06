import Joi from "joi";

export const createDisasterReportSchema = Joi.object({
  place: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.min': "Specific location must be at least 2 characters.",
      'string.base': "Specific location must be a string.",
      'any.required': "Specific location is required."
    }),

  country: Joi.string().required().messages({
    'any.required': "Country is required.",
    'string.base': "Country must be a string."
  }),

  state: Joi.string().required().messages({
    'any.required': "State is required.",
    'string.base': "State must be a string."
  }),

  district: Joi.string().required().messages({
    'any.required': "District is required.",
    'string.base': "District must be a string."
  }),

  disasterType: Joi.string()
    .valid("flood", "earthquake", "cyclone", "fire", "landslide", "other")
    .required()
    .messages({
      'any.only': "Please select a valid disaster type.",
      'any.required': "Disaster type is required.",
    }),

  severityLevel: Joi.string()
    .valid("low", "moderate", "high", "critical", "catastrophic")
    .required()
    .messages({
      'any.only': "Please select a valid severity level.",
      'any.required': "Severity level is required.",
    }),

  peopleAffected: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': "Number of people affected must be a number.",
      'number.min': "Number of people affected must be a positive number.",
      'any.required': "People affected is required."
    }),

  situationDescription: Joi.string()
    .min(10)
    .required()
    .messages({
      'string.min': "Situation description must be at least 10 characters.",
      'string.base': "Situation description must be a string.",
      'any.required': "Situation description is required."
    }),

  resourcesNeeded: Joi.array().items(Joi.string()).min(1).required()
    .messages({
      'array.min': "Please select at least one resource needed.",
      'array.base': "Resources needed must be an array of strings.",
      'any.required': "Resources needed is required."
    }),
});

export const updateDisasterReportSchema = Joi.object({
  
    place: Joi.string()
      .min(2)
      .messages({
        'string.min': "Specific location must be at least 2 characters.",
        'string.base': "Specific location must be a string.",
      }),
  
    country: Joi.string().messages({
      'string.base': "Country must be a string."
    }),
  
    state: Joi.string().messages({
      'string.base': "State must be a string."
    }),
  
    district: Joi.string().messages({
      'string.base': "District must be a string."
    }),
  
    disasterType: Joi.string()
      .valid("flood", "earthquake", "cyclone", "fire", "landslide", "other")
      .messages({
        'any.only': "Please select a valid disaster type.",
        'string.base': "Disaster type must be a string.",
      }),
  
    severityLevel: Joi.string()
      .valid("low", "moderate", "high", "critical", "catastrophic")
      .messages({
        'any.only': "Please select a valid severity level.",
      }),
  
    peopleAffected: Joi.number()
      .min(0)
      .messages({
        'number.base': "Number of people affected must be a number.",
        'number.min': "Number of people affected must be a positive number.",
      }),
  
    situationDescription: Joi.string()
      .min(10)
      .messages({
        'string.min': "Situation description must be at least 10 characters.",
        'string.base': "Situation description must be a string.",
      }),
  
    resourcesNeeded: Joi.array().items(Joi.string()).min(1)
      .messages({
        'array.min': "Please select at least one resource needed.",
        'array.base': "Resources needed must be an array of strings.",
      }),
  });
  