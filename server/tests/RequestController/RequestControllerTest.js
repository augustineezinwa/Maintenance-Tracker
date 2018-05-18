import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { requests } from '../../dummydatabase/dummydatabase';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing get a request', () => {
  it('should get a particular request', (done) => {
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
