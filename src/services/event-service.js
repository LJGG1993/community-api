/**
 * @brief const eventRepository es el repositorio de los eventos.
 */
const eventRepository = require('../repositories/event-repository');
/**
 * @brief const findEvents es para buscar un evento.
 * @returns 
 */
const findEvents = async () => eventRepository.findEvents();
/**
 * @brief const findOneEvent es para buscar un evento en especifico.
 * @param {*} eventId 
 * @returns 
 */
const findOneEvent = async (eventId) => eventRepository.findOneEvent(eventId);
/**
 * @brief const createNewEvent es para crear un  nuevo repositorio.
 * @param {*} newEvent 
 * @returns 
 */
const createNewEvent = async (newEvent) =>
  eventRepository.createNewEvent(newEvent);
/**
 * @brief const updateEvent es para actualizar un evento.
 * @param {} objectEvent 
 * @param {*} eventId 
 * @returns 
 */
const updateEvent = async (objectEvent, eventId) =>
  eventRepository.updateEvent(objectEvent, eventId);
/**
 * @brief const deleteEvent es para eliminar un evento.
 * @param {*} eventId 
 * @returns 
 */
const deleteEvent = async (eventId) => eventRepository.deleteEvent(eventId);

module.exports = {
  findEvents,
  findOneEvent,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
