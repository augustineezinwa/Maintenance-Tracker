const createRequestTable = `
DROP TABLE IF EXISTS requests;
CREATE TABLE requests(ID SERIAL PRIMARY KEY,
    requestTitle VARCHAR(50)   NOT NULL,
    requestType VARCHAR(50)    NOT NULL,
    resolved VARCHAR(10)       NOT NULL,
    approved  VARCHAR(10)      NOT NULL,
    rejected  VARCHAR(10)      NOT NULL,
    message VARCHAR(200)       NOT NULL,
    userId  INT            references users(ID) ON DELETE CASCADE);
   `;
const destroyRequestTable = 'DROP TABLE IF EXISTS requests;';

const createRequestData = (requestTitle, requestType, message, id) => {
  const query = {
    text: `INSERT INTO requests(requestTitle, requestType, resolved, approved, rejected, message, userId) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    values: [requestTitle, requestType, 'pending', 'pending', 'pending', message, id]
  };
  return query;
};

const updateRequestData = (requestTitle, requestType, message, id, requestId) => {
  const query = {
    text: `UPDATE requests SET requestTitle = $1, requestType = $2, message = $3 
    WHERE requests.userId =$4 AND requests.id = $5 RETURNING *`,
    values: [requestTitle, requestType, message, id, requestId]
  };
  return query;
};
const updateApprovedRequestData = (requestId) => {
  const query = {
    text: 'UPDATE requests SET rejected = $1, approved = $2 WHERE requests.id = $3 RETURNING *',
    values: ['fail', 'success', requestId]
  };
  return query;
};
const updateDisapprovedRequestData = (requestId) => {
  const query = {
    text: 'UPDATE requests SET rejected = $1, approved = $2, resolved = $3 WHERE requests.id = $4 RETURNING *',
    values: ['success', 'fail', 'fail', requestId]
  };
  return query;
};
const updateResolvedRequestData = (requestId) => {
  const query = {
    text: 'UPDATE requests SET resolved = $1 WHERE requests.id = $2 RETURNING *',
    values: ['success', requestId]
  };
  return query;
};
const findAllrequestsById = (id) => {
  const query = {
    text: 'SELECT * FROM requests WHERE requests.userid = $1',
    values: [id]
  };
  return query;
};
const findAllrequests = () => {
  const query = {
    text: 'SELECT * FROM requests'
  };
  return query;
};
const findRequestById = (id, userId) => {
  const query = {
    text: 'SELECT * FROM requests WHERE requests.userid = $1 AND requests.id = $2',
    values: [userId, id]
  };
  return query;
};

const findARequest = (id) => {
  const query = {
    text: 'SELECT * FROM requests WHERE requests.id = $1',
    values: [id]
  };
  return query;
};

export {
  createRequestData, createRequestTable,
  findAllrequestsById, destroyRequestTable,
  findRequestById, updateRequestData, findAllrequests, findARequest,
  updateApprovedRequestData, updateDisapprovedRequestData, updateResolvedRequestData
};
