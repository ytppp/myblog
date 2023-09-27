import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.post.deleteMany();

  console.log('Seeding...');
  const category1 = await prisma.category.upsert({
    where: { name: '111' },
    update: {},
    create: {
      name: '111',
    },
  });
  const category2 = await prisma.category.upsert({
    where: { name: '222' },
    update: {},
    create: {
      name: '222',
    },
  });
  const post1 = await prisma.post.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      content:
        'Support for MongoDB has been one of the most requested features since the initial release of...',
      category_id: category1.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
      category_id: category2.id,
    },
  });

  const post3 = await prisma.post.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      content:
        'Our engineers have been working hard, issuing new releases with many improvements...',
    },
  });

  console.log({ category1, category2, post1, post2, post3 });
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
