-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('MEMBER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Activation" AS ENUM ('PENDING', 'VALIDATED', 'REVOKED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "Activation" "Activation" NOT NULL DEFAULT E'PENDING',
ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT E'MEMBER';
