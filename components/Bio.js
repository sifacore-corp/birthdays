import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { updateBirthday, birthdayIsToday } from '../utils/dateUtils'

const Bio = ({ bio }) => {
  let { author, id, title, text, first_name, birthday } = bio
  const authorName = author ? author.name : "Unknown author";
  return (
    <Link className="prose" href={`/bios/${id}`}>
      <h2>{first_name}</h2>
      <small>By {authorName}</small>
      <p>Birthday: {updateBirthday(birthday)} </p>
      {birthdayIsToday(birthday) && <h3>Today is {first_name}'s birthday!</h3>}
      <ReactMarkdown children={text} />
    </Link>
  )
}

export default Bio
