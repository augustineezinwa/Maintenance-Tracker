import {
  destroyUserTable,
  getPrimaryKeyByEmail,
  getAdminStatusByEmail
} from '../../helper/instructions/userInstructions';

it('should not post a particular request if status field is a number', (done) => {
  const output = destroyUserTable;
  output.should.be.eql('DROP TABLE IF EXISTS users;');
  done();
});

it('should not post a particular request if status field contains invalid data or string', (done) => {
  const output = getPrimaryKeyByEmail('augustineezinwa@gmail.com');
  output.should.be.eql('SELECT id FROM users WHERE users.email = \'augustineezinwa@gmail.com\';');
  done();
});
it('should not post a request if status contains a function or number', (done) => {
  const output = getAdminStatusByEmail('augustineezinwa@gmail.com');
  output.should.be.eql('SELECT admin FROM users WHERE users.email = \'augustineezinwa@gmail.com\'');
  done();
});

