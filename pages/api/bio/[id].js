import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req, res) {
  const bioId = parseInt(req.query.id)

  if (req.method === 'DELETE') {
    const bio = await prisma.bio.delete({
      where: { id: bioId },
    })
    res.json(bio)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
