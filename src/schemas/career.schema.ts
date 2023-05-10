import Joi from "joi";

export const SearchCareerSchema = Joi.object({
    location: Joi.string().min(0),
    description: Joi.string().min(0),
    full_time: Joi.string().valid("true", "false"),
}).unknown(true);