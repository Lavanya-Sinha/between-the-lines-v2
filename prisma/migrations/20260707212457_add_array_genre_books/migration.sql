/*
  Warnings:

  - You are about to drop the column `genre` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "genre",
ADD COLUMN     "genres" TEXT[];
