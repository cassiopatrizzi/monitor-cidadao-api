const sinon = require('sinon');
const nodemailer = require('nodemailer');
sinon.stub(nodemailer, 'createTransport').returns({
  sendMail: sinon.stub().resolves(true)
});
