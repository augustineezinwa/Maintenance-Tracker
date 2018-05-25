import chai from 'chai';
import app from '../../app';

const should = chai.should();
describe('Testing user validation', () => {
  it('should return an eror if user enters an invalid firstname ', (done) => {
    const newUser = {
      firstName: 'Augustine@@@',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('enter a valid name');
        res.body.data[0].should.have.property('field').eql('firstName');
        done();
      });
  });
  it('should return an eror if user enters an invalid lastname ', (done) => {
    const newUser = {
      firstName: '',
      lastName: 'ezinwa@@@',
      email: 'jet55591@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('enter a valid name');
        res.body.data[0].should.have.property('field').eql('firstName');
        res.body.data[1].should.have.property('message').eql('enter a valid name');
        res.body.data[1].should.have.property('field').eql('lastName');
        done();
      });
  });
  it('should return an erorr if user enters an invalid email ', (done) => {
    const newUser = {
      firstName: 'emeka',
      lastName: 'ezinwa',
      email: 'augustineezinwa#####@@@@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('enter a valid email-address');
        res.body.data[0].should.have.property('field').eql('email');

        done();
      });
  });
  it('should return an erorr if user enters a weak password ', (done) => {
    const newUser = {
      firstName: 'emeka',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '5654545',
      confirmpassword: '5654545',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('password must contain a number or special character');
        res.body.data[0].should.have.property('field').eql('password');

        done();
      });
  });
  it('should return an erorr if user enters a weak password ', (done) => {
    const newUser = {
      firstName: 'emeka',
      lastName: 'ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '565ae93434',
      confirmpassword: '5654545ae',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('message').eql('password does not match');
        res.body.data[0].should.have.property('field').eql('confirmpassword');

        done();
      });
  });
});

