
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing server setup', () => {
  it('should test that database is setup', (done) => {
    chai.request(app).get('/api/v1/database')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.status.should.be.eql('success');
        done();
      });
  });
});
