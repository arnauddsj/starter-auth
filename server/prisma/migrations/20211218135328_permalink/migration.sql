/*
  Warnings:

  - You are about to drop the column `user_id` on the `validation_token` table. All the data in the column will be lost.
  - Added the required column `permalink` to the `validation_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `validation_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "validation_token" DROP CONSTRAINT "validation_token_user_id_fkey";

-- AlterTable
ALTER TABLE "validation_token" DROP COLUMN "user_id",
ADD COLUMN     "permalink" TEXT NOT NULL,
ADD COLUMN     "user_email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "validation_token" ADD CONSTRAINT "validation_token_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "user"("email") ON DELETE SET NULL ON UPDATE CASCADE;
