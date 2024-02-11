-- CreateTable
CREATE TABLE "Upload" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextAnalysis" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "uploadId" INTEGER,
    "numberOfWords" INTEGER DEFAULT 0,
    "numberOfCharacters" INTEGER DEFAULT 0,
    "numberOfSentences" INTEGER DEFAULT 0,
    "numberOfParagraphs" INTEGER DEFAULT 0,
    "longestWord" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextAnalysis_uploadId_key" ON "TextAnalysis"("uploadId");

-- AddForeignKey
ALTER TABLE "TextAnalysis" ADD CONSTRAINT "TextAnalysis_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "Upload"("id") ON DELETE SET NULL ON UPDATE CASCADE;
