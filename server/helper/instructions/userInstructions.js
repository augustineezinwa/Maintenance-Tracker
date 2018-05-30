const createUserTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(ID SERIAL PRIMARY KEY,
    firstName TEXT         NOT NULL,
    lastName  TEXT         NOT NULL,
   email VARCHAR(80) UNIQUE   NOT NULL,
   password VARCHAR(100)       NOT NULL,
   admin BOOLEAN           NOT NULL);
   `;
const destroyUserTable = 'DROP TABLE IF EXISTS users CASCADE;';

const createUserData = (firstName, lastName, email, password, admin) => {
  const query = {
    text: 'INSERT INTO users(firstname, lastname , email, password, admin) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [firstName, lastName, email, password, admin]
  };
  return query;
};

const findEmail = (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE users.email = $1',
    values: [email]
  };
  return query;
};
const getPrimaryKeyByEmail = email => `SELECT id FROM users WHERE users.email = '${email}';`;
const getAdminStatusByEmail = email => `SELECT admin FROM users WHERE users.email = '${email}'`;

export {
  createUserTable, destroyUserTable, createUserData, findEmail,
  getPrimaryKeyByEmail, getAdminStatusByEmail
};
