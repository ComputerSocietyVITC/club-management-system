-- CreateTable
CREATE TABLE "User" (
    "registration_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "github" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("registration_number")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_registration_number_key" ON "User"("registration_number");
