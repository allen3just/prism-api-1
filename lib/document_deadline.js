const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const Document = mongoose.model('Document');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const job1 = new CronJob('00 00 08 * * 0-6', function() {

  for(let i in Document) {
    if(Document[i].completionEstimate === 7 || Document[i].completionEstimate === 1){
      nodemailer.createTestAccount((err, account) => {
          if (err) {
              console.error('Failed to create a testing account. ' + err.message);
              return process.exit(1);
          }

          console.log('Credentials obtained, sending message...');

          // Create a SMTP transporter object
          let transporter = nodemailer.createTransport({
              host: account.smtp.host,
              port: account.smtp.port,
              secure: account.smtp.secure,
              auth: {
                  user: account.user,
                  pass: account.pass
              }
          });
          transporter.use('compile', hbs ({
              viewPath: 'templates',
              extName: '.hbs'
          }));

          let message = {
              from: 'allen3just@yahoo.com',
              to: 'example@example.com',
              subject: 'Document Deadline',
              template: 'document_deadline_notification',
              context: {
                Member: `${}`
              }
          };

          transporter.sendMail(message, (err, info) => {
              if (err) {
                  console.log('Error occurred. ' + err.message);
                  return process.exit(1);
              }

              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          });
      });

    }
  }},
  null,
  true,
  'America/Los_Angeles'
);
job1.start()
