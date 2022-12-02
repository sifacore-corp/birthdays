import prisma from "../../../lib/prisma";

// PUT /api/unpublish/:id
export default async function handle(req, res) {
  const bioId = parseInt(req.query.id);
  const bio = await prisma.bio.update({
    where: { id: bioId },
    data: { published: false },
  })
  res.json(bio)
}
