/*
  Warnings:

  - You are about to drop the column `completed` on the `tudo_list` table. All the data in the column will be lost.
  - Added the required column `description` to the `tudo_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tudo_list" DROP COLUMN "completed",
ADD COLUMN     "description" TEXT NOT NULL;
