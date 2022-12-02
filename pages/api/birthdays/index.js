import prisma from '../../../lib/prisma';

export default async function handle(req, res) {

  const bios = await prisma.bio.findMany({
    where: { published: true },
  })
  res.json(bios)
}



