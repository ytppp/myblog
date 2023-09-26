import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.post.deleteMany();

  console.log('Seeding...');
  const post1 = await prisma.post.create({
    data: {
      title: 'Prisma Adds Support for MongoDB',
      content:
        'Support for MongoDB has been one of the most requested features since the initial release of...',
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
