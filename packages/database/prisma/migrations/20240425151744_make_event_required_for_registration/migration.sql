/*
  Warnings:

  - Made the column `eventId` on table `Registration` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Registration` DROP FOREIGN KEY `Registration_eventId_fkey`;

-- AlterTable
ALTER TABLE `Registration` MODIFY `eventId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
