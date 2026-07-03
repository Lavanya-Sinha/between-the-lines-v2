/*
  Warnings:

  - A unique constraint covering the columns `[quote_id]` on the table `doodles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doodles_quote_id_key" ON "doodles"("quote_id");
