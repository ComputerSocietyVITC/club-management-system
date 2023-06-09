-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "regNo" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "contactNo" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clubs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "president" TEXT NOT NULL,
    "facultyCoordinator" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "projectID" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "contactNo" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "clubID" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorksOn" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "taskID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Attends" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "eventID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "clubID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_regNo_key" ON "Users"("regNo");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_contactNo_key" ON "Users"("contactNo");

-- CreateIndex
CREATE UNIQUE INDEX "Clubs_name_key" ON "Clubs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Clubs_email_key" ON "Clubs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_description_key" ON "Tasks"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_title_key" ON "Projects"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_contactNo_key" ON "Projects"("contactNo");

-- CreateIndex
CREATE UNIQUE INDEX "Events_name_key" ON "Events"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WorksOn_id_key" ON "WorksOn"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Attends_id_key" ON "Attends"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Members_id_key" ON "Members"("id");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_projectID_fkey" FOREIGN KEY ("projectID") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_clubID_fkey" FOREIGN KEY ("clubID") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorksOn" ADD CONSTRAINT "WorksOn_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorksOn" ADD CONSTRAINT "WorksOn_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attends" ADD CONSTRAINT "Attends_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attends" ADD CONSTRAINT "Attends_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_clubID_fkey" FOREIGN KEY ("clubID") REFERENCES "Clubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
