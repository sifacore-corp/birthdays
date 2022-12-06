import prisma from '../../lib/prisma';
import ReactMarkdown from "react-markdown";
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { publishBio, unPublishBio, deleteBio } from '../../utils/bioUtils'

import BioEdit from '../../components/BioEdit'
import Layout from "../../components/Layout";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let idInt = params && parseInt(params.id)

  const bio = await prisma.bio.findUnique({
    where: {
      id: idInt,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: bio,
  };
};

const Post = (props) => {
  let { title, author, published, id, first_name, last_name, text, birthday } = props
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const bioBelongsToUser = session?.user?.email === author?.email;

  if (!published) {
    title = `${title} (Draft)`
  }

  let publishButton;
  let unpublishedButton;
  let deleteButton;

  if (userHasValidSession && bioBelongsToUser) {
    publishButton = !props.published && <button onClick={() => publishBio(id)}>Publish</button>;
    unpublishedButton = props.published && <button onClick={() => unPublishBio(id)}>Unpublish</button>
    deleteButton = <button onClick={() => deleteBio(id)}>Delete</button>
  }

  return (
    <Layout>
      <h2>{first_name} {userHasValidSession && last_name}</h2>
      <p>By {author?.name || author?.email || "Unknown author"}</p>
      <p>Birthday: {new Date(birthday).toDateString()} </p>
      <ReactMarkdown children={text} />
      {publishButton}
      {unpublishedButton}
      {deleteButton}
      <h2>Edit</h2>
      <BioEdit
        defaultTitle={title}
        defaultId={id}
        first_name={first_name}
        last_name={last_name}
        defaultText={text}
        defaultBirthday={birthday}
      />
    </Layout>
  )
}

export default Post;
