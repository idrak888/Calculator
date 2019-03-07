const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/newmail');

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.post('/newmail', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:'Gmail',
            auth: {
                user: 'fullstackenthusiast@gmail.com', // generated ethereal user
                pass: req.body.password // generated ethereal password
            },
            tls: {
                rejectUnauthorized:false
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: req.body.from + ' ' + req.body.email, // sender address
            to: 'playbox8g@gmail.com', // list of receivers
            subject: req.body.subject, // Subject line
            text: '', // plain text body
            html: '<p>'+req.body.html+'</p>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
});

app.listen(port, () => {
    console.log('Server started on port '+port);
});