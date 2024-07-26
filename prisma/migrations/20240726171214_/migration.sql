/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AuthorBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthorBooks" DROP CONSTRAINT "_AuthorBooks_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorBooks" DROP CONSTRAINT "_AuthorBooks_B_fkey";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "_AuthorBooks";
