-- GenSpark Database Migration Script - v1.7 (Generated from Entities)

CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `phone` VARCHAR(255) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `bio` TEXT,
    `profile_picture_url` VARCHAR(255),
    `location` VARCHAR(255),
    `role` VARCHAR(255) NOT NULL,
    `verification_status` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `investor_verifications` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL UNIQUE,
    `document_url` VARCHAR(255) NOT NULL,
    `submitted_at` DATETIME(6) NOT NULL,
    `reviewed_at` DATETIME(6),
    `reviewed_by_admin_id` BIGINT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`reviewed_by_admin_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `pitches` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `entrepreneur_id` BIGINT NOT NULL,
    `business_name` VARCHAR(255) NOT NULL,
    `industry` VARCHAR(255) NOT NULL,
    `funding_amount_sought` DOUBLE NOT NULL,
    `short_description` VARCHAR(500),
    `video_url` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(6) NOT NULL,
    `updated_at` DATETIME(6),
--    `has_market_demand` BOOLEAN,
--    `has_monetization_strategy` BOOLEAN,
--    `has_problem_solution_fit` BOOLEAN,
--    `has_early_validation_or_traction` BOOLEAN,
--    `has_team_capability` BOOLEAN,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`entrepreneur_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `pitch_likes` (
    `pitch_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    PRIMARY KEY (`pitch_id`, `user_id`),
    FOREIGN KEY (`pitch_id`) REFERENCES `pitches`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `pitch_watchlists` (
    `pitch_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    PRIMARY KEY (`pitch_id`, `user_id`),
    FOREIGN KEY (`pitch_id`) REFERENCES `pitches`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `connections` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `investor_id` BIGINT NOT NULL,
    `entrepreneur_id` BIGINT NOT NULL,
    `established_at` DATETIME(6) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`investor_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`entrepreneur_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `meetings` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `proposer_id` BIGINT NOT NULL,
    `attendee_id` BIGINT NOT NULL,
    `meeting_time` DATETIME(6) NOT NULL,
    `confirmed` BOOLEAN NOT NULL,
    `meeting_link` VARCHAR(255),
    `created_at` DATETIME(6) NOT NULL,
    `reminder_sent` BOOLEAN,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`proposer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`attendee_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL UNIQUE,
    `user_id` BIGINT NOT NULL UNIQUE,
    `expiry_date` DATETIME(6) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `registration_otps` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `otp` VARCHAR(255) NOT NULL,
    `expiry_date` DATETIME(6) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `email_verification_tokens` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(255) NOT NULL,
    `user_id` BIGINT NOT NULL UNIQUE,
    `expiry_date` DATETIME(6) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `notifications` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `recipient_id` BIGINT NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `is_read` BOOLEAN,
    `link` VARCHAR(255),
    `created_at` DATETIME(6) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`recipient_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
