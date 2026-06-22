-- CreateTable
CREATE TABLE "mood_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mood_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_mood_tagsToquotes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_mood_tagsToquotes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_mood_tagsToquotes_B_index" ON "_mood_tagsToquotes"("B");

-- AddForeignKey
ALTER TABLE "_mood_tagsToquotes" ADD CONSTRAINT "_mood_tagsToquotes_A_fkey" FOREIGN KEY ("A") REFERENCES "mood_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mood_tagsToquotes" ADD CONSTRAINT "_mood_tagsToquotes_B_fkey" FOREIGN KEY ("B") REFERENCES "quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
