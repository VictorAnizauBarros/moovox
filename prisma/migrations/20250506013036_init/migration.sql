-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `email` VARCHAR(250) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `role` ENUM('admin', 'fazendeiro', 'veterinario', 'funcionario') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veterinario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Veterinario_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `species` VARCHAR(100) NOT NULL,
    `breed` VARCHAR(100) NOT NULL,
    `age` INTEGER NOT NULL,
    `weight` DOUBLE NOT NULL,
    `health_status` ENUM('saudavel', 'doente', 'recuperacao', 'falecido') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vaccine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `target_disease` VARCHAR(191) NOT NULL,
    `type` ENUM('injetavel', 'oral', 'intranasal', 'transdermica', 'intramamaria', 'spray') NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `batch` VARCHAR(191) NOT NULL,
    `expiration_date` VARCHAR(191) NOT NULL,
    `required_doses` INTEGER NOT NULL,
    `dosing_interval` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NOT NULL DEFAULT 'Não há observações.',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animal_id` INTEGER NOT NULL,
    `vaccine_id` INTEGER NOT NULL,
    `veterinario_id` INTEGER NOT NULL,
    `application_date` VARCHAR(191) NOT NULL,
    `next_application_date` VARCHAR(191) NULL,
    `status` ENUM('pendente', 'aplicada', 'atrasada') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telemetry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animal_id` INTEGER NOT NULL,
    `heartbeat` INTEGER NOT NULL,
    `temperature` INTEGER NOT NULL,
    `activity_level` ENUM('parado', 'leve', 'moderado', 'intenso', 'extremo') NOT NULL,
    `captured_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animal_id` INTEGER NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `captured_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Veterinario` ADD CONSTRAINT `Veterinario_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `Animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_vaccine_id_fkey` FOREIGN KEY (`vaccine_id`) REFERENCES `Vaccine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_veterinario_id_fkey` FOREIGN KEY (`veterinario_id`) REFERENCES `Veterinario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telemetry` ADD CONSTRAINT `Telemetry_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `Animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `Animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
