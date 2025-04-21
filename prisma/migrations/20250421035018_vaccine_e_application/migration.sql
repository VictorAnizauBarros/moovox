/*
  Warnings:

  - You are about to drop the column `animal_id` on the `vaccine` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `vaccine` table. All the data in the column will be lost.
  - You are about to drop the column `next_dose` on the `vaccine` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `vaccine` table. All the data in the column will be lost.
  - You are about to drop the column `vaccination_date` on the `vaccine` table. All the data in the column will be lost.
  - Added the required column `batch` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration_date` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `required_doses` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_disease` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Vaccine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vaccine` DROP FOREIGN KEY `Vaccine_animal_id_fkey`;

-- DropIndex
DROP INDEX `Vaccine_animal_id_fkey` ON `vaccine`;

-- AlterTable
ALTER TABLE `vaccine` DROP COLUMN `animal_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `next_dose`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `vaccination_date`,
    ADD COLUMN `batch` VARCHAR(191) NOT NULL,
    ADD COLUMN `dosing_interval` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `expiration_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `manufacturer` VARCHAR(191) NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NOT NULL DEFAULT 'Não há observações.',
    ADD COLUMN `required_doses` INTEGER NOT NULL,
    ADD COLUMN `target_disease` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` ENUM('injetavel', 'oral', 'intranasal', 'transdermica', 'intramamaria', 'spray') NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animal_id` INTEGER NOT NULL,
    `vaccine_id` INTEGER NOT NULL,
    `veterinario_id` INTEGER NOT NULL,
    `application_date` VARCHAR(191) NOT NULL,
    `next_application_date` VARCHAR(191) NULL,
    `status` ENUM('pendente', 'aplicada', 'atrasada') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `Animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_vaccine_id_fkey` FOREIGN KEY (`vaccine_id`) REFERENCES `Vaccine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_veterinario_id_fkey` FOREIGN KEY (`veterinario_id`) REFERENCES `Veterinario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
