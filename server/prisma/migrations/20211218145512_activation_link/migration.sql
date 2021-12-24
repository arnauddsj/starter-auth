/*
  Warnings:

  - You are about to drop the column `permaLink` on the `validation_token` table. All the data in the column will be lost.
  - Added the required column `emailActivationLink` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "emailActivationLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "validation_token" DROP COLUMN "permaLink";
