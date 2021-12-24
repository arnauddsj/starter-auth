/*
  Warnings:

  - You are about to drop the column `Activation` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "Activation",
ADD COLUMN     "activation" "Activation" NOT NULL DEFAULT E'PENDING';
