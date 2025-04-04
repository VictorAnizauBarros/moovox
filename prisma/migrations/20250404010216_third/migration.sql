/*
  Warnings:

  - Made the column `next_dose` on table `vaccine` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vaccine` MODIFY `next_dose` VARCHAR(191) NOT NULL,
    MODIFY `vaccination_date` VARCHAR(191) NOT NULL;
