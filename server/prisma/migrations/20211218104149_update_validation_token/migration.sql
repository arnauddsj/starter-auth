/*
  Warnings:

  - Added the required column `token` to the `validation_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "validation_token" ADD COLUMN     "token" TEXT NOT NULL;
