/*
  Warnings:

  - A unique constraint covering the columns `[collectionDate,lotId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collection_collectionDate_lotId_key" ON "Collection"("collectionDate", "lotId");
