import chai from 'chai';
import connect from '../../connections/connect';
import app from '../../app';

const should = chai.should();

describe('Testing 500', () => {
  it(`should return error message if an unexpected circumstance
   occurs while fetching a particular request that belongs to a user`, (done) => {
    connect.query = () => Promise.reject();
    chai.request(app).get('/api/v1/users/requests/1')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'error reading from database table',
        });
        done();
      });
  });
  it(`should return error message if an unexpected circumstance
  occurs while fetching all requests that belongs to a user`, (done) => {
    connect.query = () => Promise.reject();
    chai.request(app).get('/api/v1/users/requests')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'error reading from database table',
        });
        done();
      });
  });
  it(`should return error message if an unexpected circumstance
  occurs while fetching all requests that in the application`, (done) => {
    connect.query = () => Promise.reject();
    chai.request(app).get('/api/v1/requests')
      .send({
        token: process.env.MASTER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'error reading from database table',
        });
        done();
      });
  });
  it(`should return error message if an unexpected circumstance
  occurs while fetching a particular request that in the application`, (done) => {
    connect.query = () => Promise.reject();
    chai.request(app).get('/api/v1/requests/1')
      .send({
        token: process.env.MASTER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'error reading from database table',
        });
        done();
      });
  });
  it(`should return an error message if an unexpected cicucmstance
   happened while posting a request with a token`, (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Electric blender is not working!',
        requestType: 'repair',
        message: 'My Electric blender is not working, Come check it out',
      })
      .send({ token: process.env.USER_TOKEN })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'error occured while writing to a table',

        });
        done();
      });
  });
  it(`should return an error message if an unexpected error occured 
  while user tries to sign up`, (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet558591@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '5656455454545'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.have.property('message').eql('error reading from database table');

        done();
      });
  });
  it(`should return an error message if an unexpected
   circumstance happened while setting up user table`, (done) => {
    chai.request(app).put('/api/v1/database')
      .send({ masterpassword: process.env.MASTER_PASSWORD })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.status.should.be.eql('fail');
        done();
      });
  });
  it(`should return an error message if an unexpected
  circumstance happened while setting up requests table`, (done) => {
    chai.request(app).put('/api/v1/database/2')
      .send({ masterpassword: process.env.MASTER_PASSWORD })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.status.should.be.eql('fail');
        done();
      });
  });
  it(`should return an error message if an unexpected
  circumstance happened while seeding admin`, (done) => {
    chai.request(app).put('/api/v1/database/admin')
      .send({ masterpassword: process.env.MASTER_PASSWORD })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(500);
        res.body.status.should.be.eql('fail');
        done();
      });
  });
});

