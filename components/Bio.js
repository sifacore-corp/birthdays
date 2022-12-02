import Router from "next/router";
import ReactMarkdown from "react-markdown";

const Bio = ({ bio }) => {
  let { author, id, title, content, first_name } = bio
  const authorName = author ? author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/bios/[id]", `/bios/${id}`)}>
      <h2>{first_name}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={bio} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Bio
