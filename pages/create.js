import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/react"

const Draft = () => {
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('')


  let transformedBirthday = birthday && new Date(birthday);

  const submitData = async (e) => {
    e.preventDefault()

    try {
      const body = { title, bio, firstName, lastName, transformedBirthday };
      await fetch('/api/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/drafts');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
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
            value={birthday}
          />
          <textarea
            cols={50}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            rows={8}
            value={bio}
          />
          <input disabled={!birthday || !firstName} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  )
}

export default Draft;

Draft.auth = true;
