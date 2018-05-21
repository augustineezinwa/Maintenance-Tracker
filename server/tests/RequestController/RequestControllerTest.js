import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { requests } from '../../dummydatabase/dummydatabase';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing post request', () => {
  it('should not update request if request title is missing or invalid', (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
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
  it('should not update request if message field is invalid or empty', (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Neutral is naked',
        resolved: 'success',
        approved: 'fail',
        rejected: 'success',
        message: '',
        userId: 1
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
});
describe('Testing put request', () => {
  it('should update particular request', (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
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
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request was successfully updated',
          oldRequest: {
            id: 1,
            requestTitle: 'Electric fish is faulty!',
            resolved: 'success',
            approved: 'fail',
            rejected: 'fail',
            message: 'My Electric fish is faulty, Come check it out',
            userId: 1
          }
        });
        done();
      });
  });
  it('should not update particular request if request doesnt exist', (done) => {
    chai.request(app).put('/api/v1/users/requests/5')
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
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request was not found'
        });
        done();
      });
  });
  it('should not update particular request if url is invalid', (done) => {
    chai.request(app).put('/api/v1/users/requests/5$$$')
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
  it(`should not update particular request if rejected 
  field is supplied with strange string`, (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Electric fish is faulty!',
        resolved: 'success',
        approved: 'fail',
        rejected: 'donkey',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'The rejected status field can only be success or fail'
        });
        done();
      });
  });
  it(`should not update particular request if approved 
  field is supplied with strange string`, (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Electric fish is faulty!',
        resolved: 'success',
        approved: 'fish',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'The approved status field can only be success or fail'
        });
        done();
      });
  });
  it(`should not update particular request if approved 
  field is supplied with strange string`, (done) => {
    chai.request(app).put('/api/v1/users/requests/1')
      .send({
        requestTitle: 'Electric fish is faulty!',
        resolved: 'flying %% donkey',
        approved: 'fail',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'The resolved status field can only be success or fail'
        });
        done();
      });
  });
});
describe('Testing get a request', () => {
  it('should get a request by id', (done) => {
    chai.request(app).get('/api/v1/users/requests/1')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql(requests[0]);
        done();
      });
  });
  it('should return request not found if resource does not exist', (done) => {
    chai.request(app).get('/api/v1/users/requests/+90')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request not found!'
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
    chai.request(app).get('/api/v1/users/requests/5##/')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request not found!'
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
  it('should get a all requests', (done) => {
    chai.request(app).get('/api/v1/users/requests')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('array');
        res.body.data.should.be.eql(requests);
        done();
      });
  });
});

describe('Testing post request', () => {
  it('should post a particular request', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Electric fish is faulty!',
        resolved: 'success',
        approved: 'fail ',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request was created successfully',
          newRequest: {
            requestTitle: 'Electric fish is faulty!',
            resolved: 'success',
            approved: 'fail ',
            rejected: 'fail',
            message: 'My Electric fish is faulty, Come check it out',
            userId: 1
          }
        });
        done();
      });
  });
  it('should post a particular request', (done) => {
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
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.status.should.eql('success');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'Request was created successfully',
          newRequest: {
            requestTitle: 'Electric fish is faulty!',
            resolved: 'success',
            approved: 'fail',
            rejected: 'fail',
            message: 'My Electric fish is faulty, Come check it out',
            userId: 1
          }
        });

        done();
      });
  });
  it('should show that request has increased by one', (done) => {
    requests.length.should.be.eql(3);
    done();
  });
  it('should not post request if request title is missing or invalid', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: 'My Electric fish is faulty, Come check it out',
        userId: 1
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
        resolved: 'success',
        approved: 'fail',
        rejected: 'fail',
        message: '',
        userId: 1
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
  it('should not post request if approve status field is neither success or fail', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Live is naked',
        resolved: 'success',
        approved: 'true',
        rejected: 'fail',
        message: 'Come over, it\'s dangerous here',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'The approved status field can only be success or fail'
        });
        done();
      });
  });
  it('should not post request if rejected status field is neither success or fail', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Live is naked',
        resolved: 'success',
        approved: 'success',
        rejected: '',
        message: 'Come over, it\'s dangerous here',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'The rejected status field can only be success or fail'
        });
        done();
      });
  });
  it('should not post request if rejected status field is neither success or fail', (done) => {
    chai.request(app).post('/api/v1/users/requests')
      .send({
        requestTitle: 'Live is naked',
        resolved: 'donkey',
        approved: 'success',
        rejected: 'fail',
        message: 'Come over, it\'s dangerous here',
        userId: 1
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'The resolved status field can only be success or fail'
        });
        done();
      });
  });
});
describe('Testing get all request', () => {
  it('should get a all requests', (done) => {
    requests.length = 0;
    chai.request(app).get('/api/v1/users/requests')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.eql('fail');
        res.body.data.should.be.a('object');
        res.body.data.should.be.eql({
          message: 'requests not found!'
        });
        done();
      });
  });
});
