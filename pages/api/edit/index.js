import prisma from "../../../lib/prisma";

// PUT /api/edit/:id
export default async function handle(req, res) {

  let { text, firstName, lastName, transformedBirthday } = req.body
  try {
    // const bioId = parseInt(req.query.defaultId);
    const bio = await prisma.bio.update({
      where: { id: req.body.defaultId },
      data: {
        // title: title,
        text: text,
        birthday: transformedBirthday,
        first_name: firstName,
        last_name: lastName
      },
    })
    res.status(200).json(bio)
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating a bio." });
  }
}
