import mail from '@sendgrid/mail';


mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmails = async (req, res) => {
  try {
    let body = JSON.parse(req.body)
    let { message, emails } = body
    console.log(emails)

    // Send emails to the array list.
    await emails.map((email) => {

      (async function () {
        await mail.send({
          to: email,
          from: 'iris@saharaflair.com',
          subject: `There's a birthday today!`,
          text: message
        })
          .then(() => {
            console.log('Email sent')
            // res.status(200).json({ status: 'Ok' })
          })
          .catch((error) => {
            console.error(error)
          })
      })()

    })
    res.status(200).json({ status: 'Ok' })
  } catch (err) {
    console.log("Error:", err)
  }
}

export default sendEmails;
