-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `year` YEAR NOT NULL,
    `registration_start_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participant` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `registration_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registrant` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `street_name` VARCHAR(191) NOT NULL,
    `street_number` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `place_of_birth` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration` (
    `id` VARCHAR(191) NOT NULL,
    `music_request` VARCHAR(191) NULL,
    `registrant_id` VARCHAR(191) NOT NULL,
    `vessel_id` VARCHAR(191) NOT NULL,
    `assosciation` VARCHAR(191) NULL,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VesselType` (
    `id` VARCHAR(191) NOT NULL,
    `max_registrants` INTEGER NOT NULL DEFAULT 2,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vessel` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `vessel_type_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_registrant_id_fkey` FOREIGN KEY (`registrant_id`) REFERENCES `Registrant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_vessel_id_fkey` FOREIGN KEY (`vessel_id`) REFERENCES `Vessel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vessel` ADD CONSTRAINT `Vessel_vessel_type_id_fkey` FOREIGN KEY (`vessel_type_id`) REFERENCES `VesselType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToVesselType` ADD CONSTRAINT `_EventToVesselType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToVesselType` ADD CONSTRAINT `_EventToVesselType_B_fkey` FOREIGN KEY (`B`) REFERENCES `VesselType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

