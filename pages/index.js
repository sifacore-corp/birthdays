import Head from 'next/head'
import prisma from '../lib/prisma';

import Bio from "../components/Bio"
import Layout from "../components/Layout"

export default function Home({ feed }) {
  console.log({ feed });
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {feed.map((bio) => (
          <div key={bio.id} className="post">
            <Bio bio={bio} />
          </div>
        ))}
      </Layout>


    </div>
  )
}

export const getStaticProps = async () => {
  const feed = await prisma.bio.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
          email: true
        },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};