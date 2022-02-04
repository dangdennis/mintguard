/*
  Warnings:

  - A unique constraint covering the columns `[project_name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contract_address]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[website]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discord]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitter]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[instagram]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" SET DEFAULT uuid_generate_v1();

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
