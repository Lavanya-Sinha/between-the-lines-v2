-- CreateTable
CREATE TABLE "reflections" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "quote_id" INTEGER NOT NULL,

    CONSTRAINT "reflections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
