import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../App';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing server setup', () => {
  it('should say that server is running on port 2020', (done) => {
    chai.request(app).get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });
});
