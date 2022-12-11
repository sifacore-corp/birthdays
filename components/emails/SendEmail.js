import { postToEmailAPI, birthdayIsToday } from '../../utils/dateUtils';

export default function SendClientEmail({ allBirthdays }) {

  let birthdayNames;
  let uniqueEmails;

  let birthdaysToday = allBirthdays.filter((person) => {
    return birthdayIsToday(person.birthday)
  })

  if (birthdaysToday.length > 0) {
    console.log("It's someone's Birthday today!")

    let birthdayPeople = birthdaysToday.map((person) => { return (`${person.first_name} ${person.last_name}`) })
    // Convert to string and join with commas or and for the last item.
    birthdayNames = birthdayPeople.join(', ').replace(/, ([^,]*)$/, ' and $1')

    // Get non-celebrants
    let notBirthdaysToday = allBirthdays.filter((person) => {
      return !birthdayIsToday(person.birthday)
    })

    // Get their email ids from the referenced author list
    let emails = notBirthdaysToday.map((notBirthday) => {
      let { author } = notBirthday
      return author.email;
    })

    // Remove duplicate emails addresses
    let uniqueEmailsPointers = new Set(emails)
    uniqueEmails = Array.from(uniqueEmailsPointers)
  }

  function triggerEmail(celebrants, emails) {
    emails.map((email) => {
      let mailData = {
        email: email,
        message: `Today is ${celebrants}'s birthday. Say happy birthday!`
      }
      postToEmailAPI(mailData).then((data) => {
        console.log("Email send status: ", data)
      })
    })

  }

  return (
    <>
      <div>
        {birthdaysToday.length > 0 ?
          <button
            id="email-trigger"
            onClick={() => triggerEmail(birthdayNames, uniqueEmails)}>
            Send Emails
          </button>
          : `No birthdays today.`
        }
      </div>
    </>
  )

}
