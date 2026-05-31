-- CreateTable
CREATE TABLE `EventVesselType` (
    `id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,
    `vessel_type_id` VARCHAR(191) NOT NULL,
    `max_participants` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `EventVesselType_event_id_idx`(`event_id`),
    INDEX `EventVesselType_vessel_type_id_idx`(`vessel_type_id`),
    UNIQUE INDEX `EventVesselType_event_id_vessel_type_id_key`(`event_id`, `vessel_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Copy existing implicit m2m rows
INSERT INTO `EventVesselType` (`id`, `event_id`, `vessel_type_id`, `max_participants`)
SELECT UUID(), `A`, `B`, NULL FROM `_EventToVesselType`;

-- DropTable
DROP TABLE `_EventToVesselType`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `max_participants`;

-- AddForeignKey
ALTER TABLE `EventVesselType` ADD CONSTRAINT `EventVesselType_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventVesselType` ADD CONSTRAINT `EventVesselType_vessel_type_id_fkey` FOREIGN KEY (`vessel_type_id`) REFERENCES `VesselType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
