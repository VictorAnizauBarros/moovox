/*
  Warnings:

  - You are about to drop the column `user_id` on the `animal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `animal` DROP FOREIGN KEY `Animal_user_id_fkey`;

-- DropIndex
DROP INDEX `Animal_user_id_fkey` ON `animal`;

-- AlterTable
ALTER TABLE `animal` DROP COLUMN `user_id`;
