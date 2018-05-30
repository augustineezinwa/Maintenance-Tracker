import {
  destroyUserTable,
  createUserData,
  getPrimaryKeyByEmail,
  getAdminStatusByEmail
} from '../../helper/instructions/userInstructions';
import {
  destroyRequestTable,
  createRequestData,
 findAllrequestsById
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
it('testing sql instruction for creating request', (done) => {
  const output = findAllrequestsById(1);
  output.should.be.a('object');
  output.text.should.be
  .eql('SELECT * FROM requests WHERE requests.userid = $1');
  output.values.should.be.eql([1]);
  done();
});
it('testing sql instruction for creating user', (done) => {
  const output = createUserData('Aaron', 'ezinwa', 'aaron.biliyok@gmail.com', 'inieef',  false);
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

