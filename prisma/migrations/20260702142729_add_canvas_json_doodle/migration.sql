/*
  Warnings:

  - You are about to drop the column `data` on the `doodles` table. All the data in the column will be lost.
  - Added the required column `canvas_data` to the `doodles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doodles" DROP COLUMN "data",
ADD COLUMN     "canvas_data" JSONB NOT NULL;
