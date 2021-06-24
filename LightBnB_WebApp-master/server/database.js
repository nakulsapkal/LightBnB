const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `SELECT * 
  FROM users
  where email=$1;`;
  const values = [`${email}`];

  return pool
    .query(queryString, values)
    .then(result => {
      if (result) {
        return result.rows[0];
      }
      return null;
    })
    .catch(err => console.log(err))

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT * 
  FROM users
  WHERE id=$1;`;
  const values = [id];

  return pool.query(queryString, values)
    .then(result => {
      if (result) {
        return result.rows[0];
      }
      return null;
    })
    .catch(err => {
      console.log(err);
    })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryString = `INSERT INTO users(name,email,password) values($1,$2,$3) RETURNING *;`;
  const values = [user.name, user.email, 'password'];

  return pool.query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err);
    })

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  //return getAllProperties(null, 2);

  const queryString = `SELECT (reservations.*), avg(property_reviews.rating) as average_rating, properties.title,properties.cost_per_night, properties.number_of_bathrooms,properties.number_of_bedrooms, properties.parking_spaces
  FROM reservations
  JOIN property_reviews ON reservation_id =reservations.id
  JOIN properties ON properties.id =property_reviews.property_id
  WHERE reservations.guest_id=$1
  GROUP BY reservations.id,properties.title,properties.cost_per_night, properties.number_of_bathrooms,properties.number_of_bedrooms, properties.parking_spaces
  LIMIT $2;`;
  const values = [guest_id, limit];

  return pool.query(queryString, values)
    .then(result => result.rows)
    .catch(err => {
      console.log(err);
    })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);

  return pool
    .query(`SELECT (properties.*), avg(rating) AS average_rating 
    FROM properties
    JOIN property_reviews ON property_id= properties.id
    GROUP BY properties.id
    LIMIT $1`, [limit])
    .then((result) => {
      //console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;