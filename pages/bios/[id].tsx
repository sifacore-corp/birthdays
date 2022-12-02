import prisma from '../../lib/prisma';
import ReactMarkdown from "react-markdown";
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let idInt = params && parseInt(params.id)

  const bio = await prisma.bio.findUnique({
    where: {
      id: idInt,
    },
    select: {
      author: true
    },
  });
  return {
    props: bio,
  };
};



async function publishBio(id) {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function unPublishBio(id) {
  await fetch(`/api/unpublish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deleteBio(id) {
  await fetch(`/api/bio/${id}`, {
    method: 'DELETE'
  })
  Router.push('/')
}

const Post = (props) => {
  console.log(props)
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const bioBelongsToUser = session?.user?.email === props.author?.email;

  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  let publishButton;
  let unpublishedButton;
  let deleteButton;

  if (userHasValidSession && bioBelongsToUser) {
    publishButton = !props.published && <button onClick={() => publishBio(props.id)}>Publish</button>;
    unpublishedButton = props.published && <button onClick={() => unPublishBio(props.id)}>Unpublish</button>
    deleteButton = <button onClick={() => deleteBio(props.id)}>Delete</button>
  }

  return (
    <div>
      <h2>{props.first_name}</h2>
      <p>By {props?.author?.name || "Unknown author"}</p>
      <ReactMarkdown children={props.content} />
      {publishButton}
      {unpublishedButton}
      {deleteButton}
    </div>
  )
}

export default Post;
