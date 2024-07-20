-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_registration_id_fkey`;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
