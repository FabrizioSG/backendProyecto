const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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")


async function sendEmail(user, password) {
    const msg = {
        to: user,
        from: 'fsalazarg@est.utn.ac.cr',
        subject: 'Reset password',
        templateId: 'd-cd1879e0732941c4983e7ce1820c4e18',
        dynamic_template_data: {
          password: password,
        },
      };
    try {
      await sgMail.send(msg);
      return  { message: `SENT`};
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            data: error
          });
    }
  }
  
  module.exports = {
    sendEmail
  }