/**
 * @brief const connect es para crear la coneccion con la db.
 */
const connect = require('../connection/dbconnection');
/**
 * @brief async function findEvents es para encontrar eventos.
 * @returns 
 */
async function findEvents() {
  try {
    const connection = await connect();
    const [data] = await connection.query('SELECT * FROM events');
    return data;
  } catch (error) {
    throw { status: 500, message: error };
  }
}
/**
 * @brief const findOneEvent es para encontrar un evento en especifico.
 * @param {*} eventId 
 * @returns 
 */
const findOneEvent = async (eventId) => {
  try {
    const connection = await connect();
    const [data] = await connection.query('SELECT * FROM events WHERE id = ?', [
      eventId,
    ]);
    if (data.length === 0) {
      throw {
        status: 400,
        message: `ID not found: ${eventId}`,
      };
    }
    return data;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @const createNewEvent es para crear un nuevo evento.
 * @param {*} newEvent 
 * @returns 
 */
const createNewEvent = async (newEvent) => {
  try {
    const connection = await connect();
    return connection.query(
      'INSERT INTO events (event_name, description, profile_type, url_form, start_date, end_date, url_flyer, modality, cost, location, name, lastname, phone, mail, community_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        newEvent.event_name,
        newEvent.description,
        newEvent.profile_type,
        newEvent.url_form,
        newEvent.start_date,
        newEvent.end_date,
        newEvent.url_flyer,
        newEvent.modality,
        newEvent.cost,
        newEvent.location,
        newEvent.name,
        newEvent.lastname,
        newEvent.phone,
        newEvent.mail,
        newEvent.community_name,
      ]
    );
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief const updateEvent es para actualizar algun dato del evento.
 * @param {*} objectEvent 
 * @param {*} eventId 
 * @returns 
 */
const updateEvent = async (objectEvent, eventId) => {
  try {
    await findOneEvent(eventId);
    const connection = await connect();
    const [result] = await connection.query(
      'UPDATE events SET event_name = ?, description = ?, profile_type = ?, url_form = ?, start_date = ?, end_date = ?, url_flyer = ?, modality = ?, cost = ?, location = ?, name = ?, lastname = ?, phone = ?, mail = ?, community_name = ?',
      [
        objectEvent.event_name,
        objectEvent.description,
        objectEvent.profile_type,
        objectEvent.url_form,
        objectEvent.start_date,
        objectEvent.end_date,
        objectEvent.url_flyer,
        objectEvent.modality,
        objectEvent.cost,
        objectEvent.location,
        objectEvent.name,
        objectEvent.lastname,
        objectEvent.phone,
        objectEvent.mail,
        objectEvent.community_name,
      ]
    );
    return result;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
/**
 * @brief es para eliminar un evento.
 * @param {*} eventId 
 */
const deleteEvent = async (eventId) => {
  try {
    const connection = await connect();
    const data = await connection.query('DELETE FROM events WHERE id = ?', [
      eventId,
    ]);
    if (data[0].affectedRows === 0) {
      throw {
        status: 400,
        message: `ID not found: ${eventId}`,
      };
    }
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  findEvents,
  findOneEvent,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
