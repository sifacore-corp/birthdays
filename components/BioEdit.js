import React, { useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react"

const BioEdit = ({ defaultTitle, published, defaultId, first_name, last_name, defaultText, defaultBirthday }) => {

  const [title, setTitle] = useState(defaultTitle)
  const [text, setText] = useState(defaultText)
  const [firstName, setFirstName] = useState(first_name)
  const [lastName, setLastName] = useState(last_name)
  const [birthday, setBirthday] = useState(new Date(defaultBirthday))

  let transformedBirthday = birthday ? new Date(birthday) : defaultBirthday

  const submitData = async (e) => {
    e.preventDefault()

    try {
      const body = { defaultId, text, firstName, lastName, transformedBirthday };
      await fetch(`/api/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      Router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>Edit</h1>
        <input
          autoFocus
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          type="text"
          value={firstName}
        />
        <input
          autoFocus
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          type="text"
          value={lastName}
        />
        <input
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          value={new Date(birthday)}
        />
        <textarea
          cols={50}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          rows={8}
          value={text}
        />
        <input disabled={!birthday || !firstName} type="submit" value="Update" />
        <a className="back" href="#" onClick={() => Router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>

  )
}

export default BioEdit;

// Draft.auth = true;
