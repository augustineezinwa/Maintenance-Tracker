import {
  destroyUserTable,
  createUserData,
  getPrimaryKeyByEmail,
  getAdminStatusByEmail
} from '../../helper/instructions/userInstructions';
import {
  destroyRequestTable,
  deleteRequestData,
  createRequestData,
  findAllrequestsById,
  findRequestById,
  updateRequestData,
  findAllrequests,
  findARequest,
  updateApprovedRequestData,
  updateDisapprovedRequestData,
  updateResolvedRequestData
} from '../../helper/instructions/requestInstructions';

it('testing sql instruction for dropping users table', (done) => {
  const output = destroyUserTable;
  output.should.be.eql('DROP TABLE IF EXISTS users CASCADE;');
  done();
});

it('testing sql instruction for dropping request table', (done) => {
  const output = destroyRequestTable;
  output.should.be.eql('DROP TABLE IF EXISTS requests;');
  done();
});

it('testing sql instruction for creating request', (done) => {
  const output = createRequestData('faulty tv', 'maintenance', 'come fix my tv', 1);
  output.should.be.a('object');
  output.text.should.be
    .eql(`INSERT INTO requests(requestTitle, requestType, resolved, approved, rejected, message, userId) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`);
  output.values.should.be.eql(['faulty tv', 'maintenance', 'pending', 'pending', 'pending', 'come fix my tv', 1]);
  done();
});
it('testing sql instruction for updating request', (done) => {
  const output = updateRequestData('faulty tv', 'maintenance', 'come fix my tv', 1, 2);
  output.should.be.a('object');
  output.text.should.be
    .eql(`UPDATE requests SET requestTitle = $1, requestType = $2, message = $3 
    WHERE requests.userId =$4 AND requests.id = $5 RETURNING *`);
  output.values.should.be.eql(['faulty tv', 'maintenance', 'come fix my tv', 1, 2]);
  done();
});
it('testing sql instruction for deleting request', (done) => {
  const output = deleteRequestData(1, 2);
  output.should.be.a('object');
  output.text.should.be
    .eql('DELETE from requests WHERE requests.userId =$1 AND requests.id =$2 RETURNING *');
  output.values.should.be.eql([1, 2]);
  done();
});
it('testing sql instruction for updating approved request', (done) => {
  const output = updateApprovedRequestData(1);
  output.should.be.a('object');
  output.text.should.be
    .eql('UPDATE requests SET rejected = $1, approved = $2 WHERE requests.id = $3 RETURNING *');
  output.values.should.be.eql(['fail', 'success', 1]);
  done();
});
it('testing sql instruction for updating disapproved request', (done) => {
  const output = updateDisapprovedRequestData(1);
  output.should.be.a('object');
  output.text.should.be
    .eql('UPDATE requests SET rejected = $1, approved = $2, resolved = $3 WHERE requests.id = $4 RETURNING *');
  output.values.should.be.eql(['success', 'fail', 'fail', 1]);
  done();
});
it('testing sql instruction for resolving an approved request', (done) => {
  const output = updateResolvedRequestData(1);
  output.should.be.a('object');
  output.text.should.be
    .eql('UPDATE requests SET resolved = $1 WHERE requests.id = $2 RETURNING *');
  output.values.should.be.eql(['success', 1]);
  done();
});
it('testing sql instruction for getting all requests', (done) => {
  const output = findAllrequestsById(1);
  output.should.be.a('object');
  output.text.should.be
    .eql('SELECT * FROM requests WHERE requests.userid = $1');
  output.values.should.be.eql([1]);
  done();
});
it('testing sql instruction for getting a requests by its id', (done) => {
  const output = findARequest(1);
  output.should.be.a('object');
  output.text.should.be
    .eql('SELECT * FROM requests WHERE requests.id = $1');
  output.values.should.be.eql([1]);
  done();
});
it('testing sql instruction for getting all requests in request table', (done) => {
  const output = findAllrequests();
  output.should.be.a('object');
  output.text.should.be
    .eql('SELECT * FROM requests');
  done();
});
it('testing sql instruction for getting a particular request', (done) => {
  const output = findRequestById(1, 2);
  output.should.be.a('object');
  output.text.should.be
    .eql('SELECT * FROM requests WHERE requests.userid = $1 AND requests.id = $2');
  output.values.should.be.eql([2, 1]);
  done();
});
it('testing sql instruction for creating user', (done) => {
  const output = createUserData('Aaron', 'ezinwa', 'aaron.biliyok@gmail.com', 'inieef', false);
  output.should.be.a('object');
  output.text.should.be
    .eql('INSERT INTO users(firstname, lastname , email, password, admin) VALUES($1, $2, $3, $4, $5) RETURNING *');
  output.values.should.be.eql(['Aaron', 'ezinwa', 'aaron.biliyok@gmail.com', 'inieef', false]);
  done();
});

it('testing sql instruction for get primaryKey by email', (done) => {
  const output = getPrimaryKeyByEmail('augustineezinwa@gmail.com');
  output.should.be.eql('SELECT id FROM users WHERE users.email = \'augustineezinwa@gmail.com\';');
  done();
});
it('testing sql instruction for geting admin status by email', (done) => {
  const output = getAdminStatusByEmail('augustineezinwa@gmail.com');
  output.should.be.eql('SELECT admin FROM users WHERE users.email = \'augustineezinwa@gmail.com\'');
  done();
});

