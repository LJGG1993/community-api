const eventService = require('../services/event-service');
const joi = require('joi');
/**
 * @brief sirve para crear eventos
 */
const event = joi.object({
  event_name: joi.string().max(100).required(),
  description: joi.string().max(200).required(),
  profile_type: joi.string().max(50).required(),
  url_form: joi.string().max(1000).required(),
  start_date: joi
    .string()
    .regex(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/)
    .required(),
  end_date: joi
    .string()
    .regex(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/)
    .required(),
  url_flyer: joi.string().max(1000).required(),
  modality: joi.string().max(20).required(),
  cost: joi.number().required(),
  location: joi.string().max(200).required(),
  name: joi.string().max(50).required(),
  lastname: joi.string().max(100).required(),
  phone: joi.string().max(100).required(),
  mail: joi.string().email().max(100).required(),
  community_name: joi.string().max(100).required(),
});
/**
 * @brief sirve para encontrar eventos
 * @param {*} req 
 * @param {*} res 
 */
const findEvents = async (req, res) => {
  try {
    const allEvents = await eventService.findEvents();
    res.send({
      status: 'OK',
      data: allEvents,
    });
  } catch (error) {
    res.send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};
/**
 * @brief para encontrar un evento 
 */
const findOneEvent = async (req, res) => {
  const {
    params: { eventId },
  } = req;
  if (!eventId) {
    res.send({
      status: 'FAILED',
      data: { error: "Parameter ':eventId' can not be empty" },
    });
  }
  try {
    const eventD = await eventService.findOneEvent(eventId);
    res.send({ status: 'OK', data: eventD });
  } catch (error) {
    res.send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};
/**
 * @brief sirve para crear un nuevo evento
 * @param {*} req 
 * @param {*} res 
 */
const createNewEvent = async (req, res) => {
  const result = event.validate(req.body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      await eventService.createNewEvent(result.value);
      res.status(201).send({ status: 'OK', data: result.value });
    } catch (error) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: error?.message || error },
      });
    }
  }
};
/**
 * @brief sirve para actualizar eventos
 * @param {*} req 
 * @param {*} res 
 */
const updateEvent = async (req, res) => {
  const {
    body,
    params: { eventId },
  } = req;
  const result = event.validate(body);
  if (result.error) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: result.error.details },
    });
  } else {
    try {
      await eventService.updateEvent(result.value, eventId);
      res.status(202).send({ status: 'OK', data: result.value });
    } catch (error) {
      res.status(404).send({
        status: 'FAILED',
        data: { error: error?.message || error },
      });
    }
  }
};
/**
 * @brief sirve para eliminar un evento
 * @param {*} req 
 * @param {*} res 
 */
const deleteEvent = async (req, res) => {
  const {
    params: { eventId },
  } = req;
  if (!eventId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Prameter ':eventId' can not be empty" },
    });
  }
  try {
    await eventService.deleteEvent(eventId);
    res.status(202).send({ status: 'OK', message: 'Delete event success' });
  } catch (error) {
    res.status(404).send({
      status: 'FAILED',
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  findEvents,
  findOneEvent,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
