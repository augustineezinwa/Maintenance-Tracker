import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing server setup', () => {
  it('should test that users table is setup', (done) => {
    chai.request(app).put('/api/v1/database')
      .send({ masterpassword: process.env.MASTER_PASSWORD })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.status.should.be.eql('success');
        done();
      });
  });
  it('should test that requests table is setup', (done) => {
    chai.request(app).put('/api/v1/database/2')
      .send({ masterpassword: process.env.MASTER_PASSWORD })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.status.should.be.eql('success');
        done();
      });
  });
  it('should seed the admin into the user table', (done) => {
    chai.request(app).put('/api/v1/database/admin')
      .send({ masterpassword: process.env.MASTER_PASSWORD })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.status.should.be.eql('success');
        done();
      });
  });
});
