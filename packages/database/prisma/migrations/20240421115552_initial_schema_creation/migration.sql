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
    `registration_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registrant` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `place_of_birth` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration` (
    `id` VARCHAR(191) NOT NULL,
    `music_request` VARCHAR(191) NULL,
    `registrant_id` VARCHAR(191) NOT NULL,
    `vessel_id` VARCHAR(191) NOT NULL,
    `assosciation` VARCHAR(191) NOT NULL,

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

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_registrant_id_fkey` FOREIGN KEY (`registrant_id`) REFERENCES `Registrant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_vessel_id_fkey` FOREIGN KEY (`vessel_id`) REFERENCES `Vessel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vessel` ADD CONSTRAINT `Vessel_vessel_type_id_fkey` FOREIGN KEY (`vessel_type_id`) REFERENCES `VesselType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
