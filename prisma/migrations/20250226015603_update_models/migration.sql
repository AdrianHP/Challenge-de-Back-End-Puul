/*
  Warnings:

  - You are about to drop the `_UserToTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToTask" DROP CONSTRAINT "_UserToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToTask" DROP CONSTRAINT "_UserToTask_B_fkey";

-- DropTable
DROP TABLE "_UserToTask";

-- CreateTable
CREATE TABLE "task_users" (
    "id" SERIAL NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_users_taskId_userId_key" ON "task_users"("taskId", "userId");

-- AddForeignKey
ALTER TABLE "task_users" ADD CONSTRAINT "task_users_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_users" ADD CONSTRAINT "task_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
