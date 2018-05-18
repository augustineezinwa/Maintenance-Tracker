import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { requests } from '../../dummydatabase/dummydatabase';

const should = chai.should();
chai.use(chaiHttp);


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
