/*
  Warnings:

  - You are about to drop the column `eventId` on the `VesselType` table. All the data in the column will be lost.
  - Made the column `registration_id` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_registration_id_fkey`;

-- DropForeignKey
ALTER TABLE `VesselType` DROP FOREIGN KEY `VesselType_eventId_fkey`;

-- AlterTable
ALTER TABLE `Participant` MODIFY `registration_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `VesselType` DROP COLUMN `eventId`;

-- CreateTable
CREATE TABLE `_EventToVesselType` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EventToVesselType_AB_unique`(`A`, `B`),
    INDEX `_EventToVesselType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToVesselType` ADD CONSTRAINT `_EventToVesselType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToVesselType` ADD CONSTRAINT `_EventToVesselType_B_fkey` FOREIGN KEY (`B`) REFERENCES `VesselType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
