const createUserTable =
`
DROP TABLE IF EXISTS users;
CREATE TABLE users(ID INT PRIMARY KEY,
    firstName TEXT         NOT NULL,
    lastName  TEXT         NOT NULL,
   password CHAR(25)       NOT NULL,
   email CHAR(80) UNIQUE   NOT NULL,
   admin BOOLEAN           NOT NULL);
   `;
const destroyUserTable = 'DROP TABLE IF EXISTS users;';

export { createUserTable, destroyUserTable };
