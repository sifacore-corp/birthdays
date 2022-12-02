import { GetServerSideProps } from "next";
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import Link from "next/link";

import Layout from "../components/Layout";
import Bio from '../components/Bio'

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 403;

    return {
      props: {
        drafts: []
      }
    }
  }

  const drafts = await prisma.bio.findMany({
    where: {
      author: {
        email: session.user.email
      },
      published: false,
    },
    include: {
      author: {
        select: { name: true }
      }
    }
  })

  return {
    props: { drafts }
  }
}

const Drafts = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const isActive = (pathname) => router.pathname === pathname;

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <di>You need to be <Link href="/api/auth/signin" data-active={isActive('/signup')}>logged in</Link> to see this page.</di>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((bio) => (
            <div key={bio.id} className="post">
              <Bio bio={bio} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Drafts;
