import chai from 'chai';
import app from '../../app';

describe('testing user sign up', () => {
  it('should successfully signup a user that enters all required fields', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('message').eql('you signed up successfully');
        res.body.data.should.have.property('token');

        done();
      });
  });
  it('should return an error message if a user tries to sign up with an already existing email', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '5656455454545'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.have.property('message').eql('email already exist');

        done();
      });
  });
  it('should successfully login a user that enters correctly all his credentials', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('message').eql('you are logged in');
        res.body.data.should.have.property('token');

        done();
      });
  });
  it('should return an error message if user enter an incorrect password', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545',
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser).end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.have.property('message').eql('password is incorrect!');

        done();
      });
  });
  it('should return an error message if user enters a non-existing email', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'aaron.biliyok@gmail.com',
      password: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser).end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.have.property('message').eql('you cant login at this time, email doesnt exist');
        done();
      });
  });
});
