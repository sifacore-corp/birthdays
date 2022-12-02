import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  const { title, bio, transformedBirthday, firstName, lastName } = req.body;

  const session = await getSession({ req })
  const result = await prisma.bio.create({
    data: {
      title: title,
      bio: bio,
      birthday: transformedBirthday,
      first_name: firstName,
      last_name: lastName,
      author: { connect: { email: session?.user?.email } }
    }
  })
  res.json(result);
}
