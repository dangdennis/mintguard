-- CreateEnum
CREATE TYPE "artist_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "fraction_operation_type" AS ENUM ('MERGED', 'SPLIT');

-- CreateEnum
CREATE TYPE "transfer_type" AS ENUM ('WITHDRAWAL', 'DEPOSIT');

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "project_name" TEXT NOT NULL,
    "contract_address" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_name_key" ON "Project"("project_name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_contract_address_key" ON "Project"("contract_address");

-- CreateIndex
CREATE UNIQUE INDEX "Project_website_key" ON "Project"("website");

-- CreateIndex
CREATE UNIQUE INDEX "Project_discord_key" ON "Project"("discord");

-- CreateIndex
CREATE UNIQUE INDEX "Project_twitter_key" ON "Project"("twitter");

-- CreateIndex
CREATE UNIQUE INDEX "Project_instagram_key" ON "Project"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "Project_email_key" ON "Project"("email");
