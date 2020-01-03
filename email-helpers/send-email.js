const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = sendEmail

async function sendEmail(emailData) {
  return new Promise(async (resolve, reject) => {
    try {
      const msg = {
        to: emailData.email,
        from: 'antonio@acucciniello.com',
        subject: emailData.subject,
        text: emailData.emailText,
        html: emailData.emailHTML,
      }
      try {
        let res = await sgMail.send(msg)
        resolve('email success')
      } catch (e) {
        console.log(e.response.body.errors)
        reject(e.response.body.errors)
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
