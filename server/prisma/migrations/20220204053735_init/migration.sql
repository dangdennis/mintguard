-- CreateEnum
CREATE TYPE "artist_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "fraction_operation_type" AS ENUM ('MERGED', 'SPLIT');

-- CreateEnum
CREATE TYPE "transfer_type" AS ENUM ('WITHDRAWAL', 'DEPOSIT');

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "project_name" TEXT NOT NULL,
    "contract_address" TEXT NOT NULL,
    "website" TEXT,
    "discord" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "email" TEXT,
    "team_doxxed" BOOLEAN DEFAULT false,
    "risk_score" INTEGER DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");
