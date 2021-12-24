/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `validation_token` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `validation_token` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `validation_token` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `validation_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `validation_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "validation_token" DROP CONSTRAINT "validation_token_user_email_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "validation_token" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "user_email",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "validation_token" ADD CONSTRAINT "validation_token_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE SET NULL ON UPDATE CASCADE;
