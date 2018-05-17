import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { requests } from '../../dummydatabase/dummydatabase';

const should = chai.should();
chai.use(chaiHttp);


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
