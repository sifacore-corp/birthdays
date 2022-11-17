import prisma from '../../lib/prisma';
import ReactMarkdown from "react-markdown";
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function unPublishPost(id: string): Promise<void> {
  await fetch(`/api/unpublish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id) {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE'
  })
  Router.push('/')
}

const Post = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  let publishButton;
  let unpublishedButton;
  let deleteButton;

  if (userHasValidSession && postBelongsToUser) {
    publishButton = !props.published && <button onClick={() => publishPost(props.id)}>Publish</button>;
    unpublishedButton = props.published && <button onClick={() => unPublishPost(props.id)}>Unpublish</button>
    deleteButton = <button onClick={() => deletePost(props.id)}>Delete</button>
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.author?.name || "Unknown author"}</p>
      <ReactMarkdown children={props.content} />
      {publishButton}
      {unpublishedButton}
      {deleteButton}
    </div>
  )
}

export default Post;
