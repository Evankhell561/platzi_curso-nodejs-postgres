const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const createOrderShema = Joi.object({
  customerId: customerId.required(),
});


const getOrderShema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderShema, getOrderShema };
