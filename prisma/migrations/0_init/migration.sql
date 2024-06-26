-- CreateTable
CREATE TABLE `user` (
    `user_ID` INTEGER NOT NULL,
    `account` VARCHAR(50) NULL,
    `password` CHAR(60) NULL,
    `enrollment_date` DATE NULL,
    `address` VARCHAR(120) NULL,
    `email_address` VARCHAR(80) NULL,
    `phone_number` VARCHAR(18) NULL,

    PRIMARY KEY (`user_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

