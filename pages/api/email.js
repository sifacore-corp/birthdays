import mail from '@sendgrid/mail';


mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmails = async (req, res) => {
  let body = JSON.parse(req.body)
  console.log(body)
  let { message, emails } = body
  // // Send emails to the array list.
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
        })
        .catch((error) => {
          console.error(error)
        })

    })()
  })
  return res.status(200).json({ msg: "Emails" });

}

export default sendEmails;
