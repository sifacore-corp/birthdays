import prisma from '../../../lib/prisma';
import mail from '@sendgrid/mail';
import { startOfToday, endOfToday } from 'date-fns'

export default async function handle(req, res) {

  try {

    const birthdaysToday = await prisma.bio.findMany({
      where: {
        birthday: {
          // Get a range of birthdays between the beginning and end of today
          gte: startOfToday(),
          lte: endOfToday()
        }
      },
    })
    // res.json(birthdaysToday)

    if (birthdaysToday.length > 0) {
      console.log("Birthday today!")

      let birthdayIds = birthdaysToday.map((birthday) => birthday.id)
      let birthdayPeople = birthdaysToday.map((person) => { return (`${person.first_name} ${person.last_name}`) })
      // Convert to string and joind with commas or and for the last item.
      let birthdayNames = birthdayPeople.join(', ').replace(/, ([^,]*)$/, ' and $1')

      // Get list of people without birthdays (prisma notIn or something similar)
      const notBirthdaysToday = await prisma.bio.findMany({
        where: {
          id: {
            notIn: birthdayIds
          }
        },
        include: {
          author: {
            select: { name: true, email: true },
          },
        }
      })
      // res.json(notBirthdaysToday)

      // Get their email ids from the referenced author list
      let emails = notBirthdaysToday.map((notBirthday) => {
        let { author } = notBirthday
        return author.email;
      })

      // // Remove duplicate emails addresses
      let uniqueEmailsPointers = new Set(emails)
      let uniqueEmails = Array.from(uniqueEmailsPointers)

      // // Send emails to the array list.
      mail.setApiKey(process.env.SENDGRID_API_KEY);
      uniqueEmails.map((email) => {
        (async function () {
          await mail.send({
            to: email,
            from: 'iris@saharaflair.com',
            subject: `There's a birthday today!`,
            text: `Today is ${birthdayNames}'s birthday. Say happy birthday!`
          })
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })

        })()
      })
      res.json(uniqueEmails)


    } else {
      res.json("No birthdays today")
    }

  } catch (err) {
    res.json(err)
    console.error(err)
  }

}
