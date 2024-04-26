/*
  Warnings:

  - Added the required column `city` to the `Registrant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Registrant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_name` to the `Registrant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_number` to the `Registrant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Registrant` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `postal_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `street_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `street_number` VARCHAR(191) NOT NULL;
