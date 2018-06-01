import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing get a request', () => {
  it('should get a request by id', (done) => {
    chai.request(app).get('/api/v1/users/requests/1')
      .send({
        token: 'drcfef343224edsAsomefaketoken'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.message.should.be.eql('Unauthorized! please provide valid credentials to continue');
        done();
      });
  });
  it('should return request not found if resource does not exist', (done) => {
    chai.request(app).get('/api/v1/users/requests/+90')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Forbidden!, please sign up or login!'
        });
        done();
      });
  });
  it('should return an error message for invalid url input', (done) => {
    chai.request(app).get('/api/v1/users/requests/a_ 850sgidg4rr34 3434r34 23refd/')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'url not recognized!'
        });
        done();
      });
  });
  it('should return an error message for more invalid url input', (done) => {
    chai.request(app).get('/api/v1/users/requests/5$$$/')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'url not recognized!'
        });
        done();
      });
  });

  it('should return an error message for more invalid url input', (done) => {
    chai.request(app).get('/api/v1/users/requests/5&&')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'url not recognized!'
        });
        done();
      });
  });
});
describe('Testing get all request', () => {
  it('should login admin and obtain token', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: process.env.MASTER_PASSWORD,
      confirmpassword: process.env.MASTER_PASSWORD
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('message').eql('you are logged in');
        res.body.data.should.have.property('token');
        process.env.MASTER_TOKEN = res.body.data.token;
        done();
      });
  });
  it('should sign up user and obtain token', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55555@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('message').eql('you signed up successfully');
        res.body.data.should.have.property('token');
        process.env.USER_TOKEN = res.body.data.token;
        done();
      });
  });
  it('should return error message if no request was found', (done) => {
    chai.request(app).get('/api/v1/users/requests')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message');
        res.body.data.message.should.be.eql('No request found at this time');
        done();
      });
  });
  it('should return error message to admin if no request was found', (done) => {
    chai.request(app).get('/api/v1/requests')
      .send({
        token: process.env.MASTER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message');
        res.body.data.message.should.be.eql('No request found at this time');
        done();
      });
  });
  it('should return error message to admin if no request was found by id', (done) => {
    chai.request(app).get('/api/v1/requests/8')
      .send({
        token: process.env.MASTER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message');
        res.body.data.message.should.be.eql('No request found at this time');
        done();
      });
  });

  it('should return error message if no request was found', (done) => {
    chai.request(app).get('/api/v1/users/requests/8')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message');
        res.body.data.message.should.be.eql('No request found at this time!');
        done();
      });
  });
});

describe('Testing post request', () => {
  it('should post a request with a token', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Electric fish is faulty!',
        requestType: 'maintenance',
        message: 'My Electric fish is faulty, Come check it out',
      })
      .send({ token: process.env.USER_TOKEN })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'request was created successfully',
          request: {
            id: 1,
            requestTitle: 'Electric fish is faulty!',
            requestType: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out'
          }
        });
        done();
      });
  });
  it('should post a request with a token', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Electric cooker is faulty!',
        requestType: 'maintenance',
        message: 'My Electric fish is faulty, Come check it out',
      })
      .send({ token: process.env.USER_TOKEN })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'request was created successfully',
          request: {
            id: 2,
            requestTitle: 'Electric cooker is faulty!',
            requestType: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out'
          }
        });
        done();
      });
  });
  it('should return all requests made by a user', (done) => {
    chai.request(app).get('/api/v1/requests')
      .send({
        token: process.env.MASTER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('array');
        res.body.data.should.be.eql([
          {
            id: 1,
            requesttitle: 'Electric fish is faulty!',
            requesttype: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out',
            userid: 2
          },
          {
            id: 2,
            requesttitle: 'Electric cooker is faulty!',
            requesttype: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out',
            userid: 2
          }
        ]);
        done();
      });
  });
  it('should return all requests made by a user', (done) => {
    chai.request(app).get('/api/v1/users/requests')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('array');
        res.body.data.should.be.eql([
          {
            id: 1,
            requesttitle: 'Electric fish is faulty!',
            requesttype: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out',
            userid: 2
          },
          {
            id: 2,
            requesttitle: 'Electric cooker is faulty!',
            requesttype: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out',
            userid: 2
          }
        ]);
        done();
      });
  });
  it('Admin should be able to get a request by id made by a user', (done) => {
    chai.request(app).get('/api/v1/requests/2')
      .send({
        token: process.env.MASTER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('array');
        res.body.data.should.be.eql([
          {
            id: 2,
            requesttitle: 'Electric cooker is faulty!',
            requesttype: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out',
            userid: 2
          }
        ]);
        done();
      });
  });
  it('should get a request by id made by a user', (done) => {
    chai.request(app).get('/api/v1/users/requests/2')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.eql([
          {
            id: 2,
            requesttitle: 'Electric cooker is faulty!',
            requesttype: 'maintenance',
            resolved: 'pending',
            approved: 'pending',
            rejected: 'pending',
            message: 'My Electric fish is faulty, Come check it out',
            userid: 2
          }
        ]);
        done();
      });
  });
  it('should not post a particular request without a token', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Electric fish is faulty!',
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Forbidden!, please sign up or login!'
        });

        done();
      });
  });
  it('should not post a particular request without a token', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Electric fish is faulty!',
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Forbidden!, please sign up or login!'
        });

        done();
      });
  });
  it('admin should not get all particular request without master token', (done) => {
    chai.request(app).get('/api/v1/requests')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Unauthorized! You dont possess Admin privileges!'
        });

        done();
      });
  });

  it('should not post request if request title is missing or invalid', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out'
      })
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request Title is invalid or empty'
        });
        done();
      });
  });
  it('should not post request if message field is invalid or empty', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Neutral is naked',
        requestType: 'maintenance',
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: ''
      })
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Message is invalid or empty'
        });
        done();
      });
  });
  it('should not post request if request type field is invalid', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Neutral is naked',
        requestType: 'donkey',
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: ''
      })
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request type can only be maintenance or repair'
        });
        done();
      });
  });
});
describe('Testing get all request for a user', () => {
  it('should return an error message if user doesnt provide a token', (done) => {
    chai.request(app).get('/api/v1/users/requests')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Forbidden!, please sign up or login!'
        });
        done();
      });
  });
  it(`should return an error message if user provides
     a fake token while trying to get all requests`, (done) => {
    chai.request(app).get('/api/v1/users/requests')
      .send({
        token: 'someFAKEtPOKNE3$#%$%#'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Unauthorized! please provide valid credentials to continue'
        });
        done();
      });
  });
  it('should get a request by id', (done) => {
    chai.request(app).get('/api/v1/users/requests/5')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.message.should.be.eql('No request found at this time!');
        done();
      });
  });
  it('should get a request by id', (done) => {
    chai.request(app).get('/api/v1/users/requests/1')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.eql({
          id: 1,
          requesttitle: 'Electric fish is faulty!',
          requesttype: 'maintenance',
          resolved: 'pending',
          approved: 'pending',
          rejected: 'pending',
          message: 'My Electric fish is faulty, Come check it out',
          userid: 2,
        });
        done();
      });
  });
  it('should get all requests for an authenticated user', (done) => {
    chai.request(app).get('/api/v1/users/requests')
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.eql({
          id: 1,
          requesttitle: 'Electric fish is faulty!',
          requesttype: 'maintenance',
          resolved: 'pending',
          approved: 'pending',
          rejected: 'pending',
          message: 'My Electric fish is faulty, Come check it out',
          userid: 2,
        });
        done();
      });
  });
  it('should return an error message for more invalid url input', (done) => {
    chai.request(app).get('/api/v1/users/requests/55')
      .send({ token: process.env.USER_TOKEN })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'No request found at this time!'
        });
        done();
      });
  });
});

describe('Testing update request api endpoint', () => {
  it('should not update request if user fails to provide token', (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Electric fish is faulty',
        requestType: 'maintenance',
        message: 'My Electric fish is faulty, Come check it out',
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Forbidden!, please sign up or login!'
        });
        done();
      });
  });
  it('should not update request if message field is invalid or empty', (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Neutral is naked',
        requestType: 'repair',
        message: '',
      })
      .send({ token: process.env.USER_TOKEN })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Message is invalid or empty'
        });
        done();
      });
  });
});
describe('Testing put request', () => {
  it('should not update particular request if request type is invalid', (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Electric fish is faulty!',
        requestType: 'donkey',
        message: 'My Electric fish is faulty, Come check it out'
      })
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request type can only be maintenance or repair'
        });
        done();
      });
  });
  it('should not update particular request if request doesnt exist', (done) => {
    chai.request(app).put('/api/v1/users/requests/5')
      .send({
        requestTitle: 'Electric fish is faulty!',
        message: 'My Electric fish is faulty, Come check it out'
      })
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Cant update! Cant find request!'
        });
        done();
      });
  });
  it('should not update particular request if url is invalid', (done) => {
    chai.request(app).put('/api/v1/users/requests/5$$$')
      .send({
        requestTitle: 'Electric fish is faulty!',
        message: 'My Electric fish is faulty, Come check it out'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'url not recognized!'
        });
        done();
      });
  });
  it(`should not update particular request if message is empty
  field is supplied with strange string`, (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Electric fish is faulty!',
        requestType: 'repair',
        message: '',
      })
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Message is invalid or empty'
        });
        done();
      });
  });
  it('should update particular request with correct reqeust fields', (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Electric Cooker is faulty!',
        requestType: 'maintenance',
        message: 'My Electric cook is faulty, Come check it out'
      })
      .send({
        token: process.env.USER_TOKEN
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'request was updated successfully',
          request: {
            id: 1,
            requestTitle: 'Electric Cooker is faulty!',
            requestType: 'maintenance',
            message: 'My Electric cook is faulty, Come check it out',
            approved: 'pending',
            rejected: 'pending',
            resolved: 'pending'
          }
        });
        done();
      });
  });
});
