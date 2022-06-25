import { PrismaClient, Task } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: tasks,
  });
}

const tasks = [
  {
    name: "Wake Up Happy",
  },
  {
    name: "Morning Motivation",
  },
  {
    name: "Walking On Sunshine",
  },
];

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
