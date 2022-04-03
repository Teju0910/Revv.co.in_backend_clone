let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
        user: 'clonerevv@gmail.com',
        pass :  process.env.PASS
    }
  });

  module.exports = {transporter}
  
  