import sgMail from '@sendgrid/mail';


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmails = async (req, res) => {
  try {
    let body = JSON.parse(req.body)
    let { message, email } = body
    console.log(email)

    await sgMail.send({
      to: email,
      from: 'iris.i@saharaflair.com',
      subject: `There's a birthday today!`,
      text: message
    })
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

    return res.status(200).json({ status: 'Ok' })
  } catch (err) {
    console.log("Error:", err)
  }
}

export default sendEmails;
