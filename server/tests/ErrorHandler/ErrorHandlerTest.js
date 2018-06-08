import chai from 'chai';
import app from '../../app';


describe('testing database read error method', () => {
  it('should return an error response if client cant read from table', (done) => {
    chai.request(app).get('/error/read')
      .end((err, res) => {
        res.should.have.status(500);
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message').eql('error reading from database table');
        done();
      });
  });
  it('should return an error response if client cant create a table', (done) => {
    chai.request(app).get('/error/create')
      .end((err, res) => {
        res.should.have.status(500);
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message').eql('error creating table');
        done();
      });
  });
  it('should return an error response if client cant connect to database', (done) => {
    chai.request(app).get('/error/connect')
      .end((err, res) => {
        res.should.have.status(500);
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message').eql('error connecting to the database');
        done();
      });
  });
  it('should return an error response if client cant write to table', (done) => {
    chai.request(app).get('/error/write')
      .end((err, res) => {
        res.should.have.status(500);
        res.body.status.should.eql('fail');
        res.body.data.should.have.property('message').eql('error occured while writing to a table');
        done();
      });
  });
});
