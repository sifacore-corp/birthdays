import sgMail from '@sendgrid/mail';


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmails = async (req, res) => {
  try {
    let body = JSON.parse(req.body)
    let { message, emails } = body
    console.log(emails)

    await sgMail.send({
      to: `irisb_d@yahoo.com`,
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


    // Send emails to the array list.
    // emails.map((email) => {

    //   (async function () {
    //     await sgMail.send({
    //       to: email,
    //       from: 'iris@saharaflair.com',
    //       subject: `There's a birthday today!`,
    //       text: message
    //     })
    //       .then(() => {
    //         console.log('Email sent')
    //         res.status(200).json({ status: 'Ok' })
    //       })
    //       .catch((error) => {
    //         console.error(error)
    //       })
    //   })()

    // })
    return res.status(200).json({ status: 'Ok' })
  } catch (err) {
    console.log("Error:", err)
  }
}

export default sendEmails;
