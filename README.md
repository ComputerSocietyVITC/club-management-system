## How to get started with development

1. Copy `.env.copy` and make a new file `.env` and fill in the data
2. Copy `.env.local.copy` and make a new file `.env.local` and fill in the data
3. Run `prisma db push` when you make changes to `prisma/schema.prisma` (its good practice to run `npx prisma migrate dev --name "some-name"`)

After this just figure stuff out <3