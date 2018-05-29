import chai from 'chai';
import InputFieldValidation from '../../helper/InputFieldValidaton';

const should = chai.should();
const {
  validateStatus,
  validateRequestMessage,

} = InputFieldValidation;
const invalidDataOne = 'fish';
const invalidDataTwo = '34490034';
const invalidDataThree = '';
const invalidDataFour = '/\n/qfish/0?ieri4i3@$5456';
const invalidDataFive = Number(0);
const invalidDataSix = true;
const invalidDataSeven = Number.parseInt('true', 10);
const validDataEight = 'success';
const validDataNine = 'fail';
const invalidMessage = '0343498483984938483493843483984';
const invalidMessageTwo = '$%%%come out fish king!';
const invalidMessageThree = '$$flying donkey && fishes fell of the wheel';
const invalidMessageFour = Number.parseInt('250000donkeys and goats', 10);
const invalidMessageFive = 'H I ';
const invalidMessageSix = `'Hi..........................                             
                 '...''`;
describe('Testing validateStatus method', () => {
  it('should not post a particular request if status field is invalid', (done) => {
    const output = validateStatus(invalidDataOne);
    output.should.be.eql(0);
    done();
  });
  it('should not post a particular request if status field is a number', (done) => {
    const output = validateStatus(invalidDataTwo);
    output.should.be.eql(0);
    done();
  });
  it('should not post a particular request if status field is a number', (done) => {
    const output = validateStatus(invalidDataThree);
    output.should.be.eql(0);
    done();
  });
  it('should not post a particular request if status field contains invalid data or string', (done) => {
    const output = validateStatus(invalidDataFour);
    output.should.be.eql(0);
    done();
  });
  it('should not post a request if status contains a function or number', (done) => {
    const output = validateStatus(invalidDataFive);
    output.should.be.eql(0);
    done();
  });
  it('should not post a request if status field contains a boolean', (done) => {
    const output = validateStatus(invalidDataSix);
    output.should.be.eql(0);
    done();
  });
  it('should not post a particular request if status field contains a function', (done) => {
    const output = validateStatus(invalidDataSeven);
    output.should.be.eql(0);
    done();
  });
  it('should post a particular request if status is success', (done) => {
    const output = validateStatus(validDataEight);
    output.should.be.eql('success');
    done();
  });
  it('should post a particular request if status is fail', (done) => {
    const output = validateStatus(validDataNine);
    output.should.be.eql('fail');
    done();
  });
});

describe('Testing validateRequestMessage method', () => {
  it('should not post a request if message field is invalid', (done) => {
    const output = validateRequestMessage(invalidMessage);
    output.should.be.eql('Message contains invalid syntax');
    done();
  });
  it('should not post a request if message field contains some bad syntax', (done) => {
    const output = validateRequestMessage(invalidMessageTwo);
    output.should.be.eql('Message contains invalid syntax');
    done();
  });
  it('should not post a request if message field contains invalid syntax', (done) => {
    const output = validateRequestMessage(invalidMessageThree);
    output.should.be.eql('Message contains invalid syntax');
    done();
  });
  it('should not post a request if message field contains a function', (done) => {
    const output = validateRequestMessage(invalidMessageFour);
    output.should.be.eql('Message is invalid or empty');
    done();
  });
  it('should not post a request if message fied is too short', (done) => {
    const output = validateRequestMessage(invalidMessageFive);
    output.should.be.eql('Message is too short');
    done();
  });
  it('should not post a request if message fied is too long', (done) => {
    const output = validateRequestMessage(invalidMessageSix);
    output.should.be.eql('Message is too long');
    done();
  });
});

