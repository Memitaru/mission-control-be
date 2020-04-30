//LAB23-T1 Search Feed Resolver
async function feed(parent, args, context) {
    const count = await context.prisma
      .ProjectsConnection({
        where: {
          OR: [
            { name_contains: args.filter },
            { product_contains: args.filter },
            { status_contains: args.filter },
            { active_contains: args.filter },
            { assignments_contains: args.filter },
            { notes_contains: args.filter },
          ],
        },
      })
      .aggregate()
      .count()
    const projects = await context.prisma.projects({
      where: {
        OR: [
            { name_contains: args.filter },
            { product_contains: args.filter },
            { status_contains: args.filter },
            { active_contains: args.filter },
            { assignments_contains: args.filter },
            { notes_contains: args.filter },
        ],
      },
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    })
    return {
      count,
      projects,
    }
  }
  
  module.exports = {
    feed,
  }