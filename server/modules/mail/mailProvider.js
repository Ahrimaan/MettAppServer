var helper = require('sendgrid').mail;

exports.SendMailToUser = (userMail, guid) => {
    var from_email = new helper.Email('webmaster@black-mesa.de');
    var to_email = new helper.Email(userMail);
    var subject = 'Account Activation';
    var content = new helper.Content('text/plain',
        'Hi, please click the following URL to Activate your user : '
        + process.env.AllowedHost + '/unlock/' + guid);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var sg = require('sendgrid')(process.env.SendGridKey);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });

}

