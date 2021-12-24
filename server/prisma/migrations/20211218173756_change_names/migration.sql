/*
  Warnings:

  - You are about to drop the column `emailActivationLink` on the `user` table. All the data in the column will be lost.
  - Added the required column `emailVerificationLink` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "emailActivationLink",
ADD COLUMN     "emailVerificationLink" TEXT NOT NULL;
