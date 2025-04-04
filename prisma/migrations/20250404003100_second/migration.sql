/*
  Warnings:

  - You are about to drop the column `vaccinarion_date` on the `vaccine` table. All the data in the column will be lost.
  - Added the required column `vaccination_date` to the `Vaccine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vaccine` DROP COLUMN `vaccinarion_date`,
    ADD COLUMN `vaccination_date` DATE NOT NULL;
