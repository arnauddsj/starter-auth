/*
  Warnings:

  - You are about to drop the column `permalink` on the `validation_token` table. All the data in the column will be lost.
  - Added the required column `permaLink` to the `validation_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "validation_token" DROP COLUMN "permalink",
ADD COLUMN     "permaLink" TEXT NOT NULL;
