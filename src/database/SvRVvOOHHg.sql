-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 05, 2019 at 03:10 PM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SvRVvOOHHg`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imageId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `detail` text COLLATE utf8_unicode_ci,
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `apply_recruitment`
--

CREATE TABLE `apply_recruitment` (
  `status` tinyint(4) DEFAULT '0',
  `recruitmentId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `beginTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `purpose` text COLLATE utf8_unicode_ci,
  `status` tinyint(4) DEFAULT '1',
  `type` tinyint(4) DEFAULT '0',
  `userId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `university` text COLLATE utf8_unicode_ci NOT NULL,
  `specialize` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmFile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `addressId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `adminId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_address`
--

CREATE TABLE `lab_address` (
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `province` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ward` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `detail` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_image`
--

CREATE TABLE `lab_image` (
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `imageId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_member`
--

CREATE TABLE `lab_member` (
  `position` text COLLATE utf8_unicode_ci,
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_scheduler`
--

CREATE TABLE `lab_scheduler` (
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `schedulerId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `status` tinyint(4) DEFAULT '0',
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imageId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `projectAdminId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_member`
--

CREATE TABLE `project_member` (
  `projectId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_scheduler`
--

CREATE TABLE `project_scheduler` (
  `projectId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `schedulerId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recruitment`
--

CREATE TABLE `recruitment` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `position` text COLLATE utf8_unicode_ci,
  `requirement` text COLLATE utf8_unicode_ci,
  `createdDate` datetime DEFAULT NULL,
  `isOpen` tinyint(4) DEFAULT '1',
  `forLabId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `forProjectId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scheduler`
--

CREATE TABLE `scheduler` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date` datetime DEFAULT NULL,
  `beginTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `work` text COLLATE utf8_unicode_ci,
  `type` tinyint(4) DEFAULT '0',
  `userId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `take_part_in_activity`
--

CREATE TABLE `take_part_in_activity` (
  `activityId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tool`
--

CREATE TABLE `tool` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) DEFAULT '0',
  `amount` tinyint(4) DEFAULT '0',
  `description` text COLLATE utf8_unicode_ci,
  `labId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(4) DEFAULT '1',
  `birthday` datetime DEFAULT NULL,
  `avatarImage` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatarId` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fullname` text COLLATE utf8_unicode_ci,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IDCardNumber` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `university` text COLLATE utf8_unicode_ci,
  `IDNumber` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` tinyint(4) DEFAULT '0',
  `job` text COLLATE utf8_unicode_ci,
  `isTeacher` tinyint(1) DEFAULT '0',
  `isAccepted` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `labId` (`labId`);

--
-- Indexes for table `apply_recruitment`
--
ALTER TABLE `apply_recruitment`
  ADD PRIMARY KEY (`recruitmentId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `labId` (`labId`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addressId` (`addressId`),
  ADD KEY `adminId` (`adminId`);

--
-- Indexes for table `lab_address`
--
ALTER TABLE `lab_address`
  ADD PRIMARY KEY (`labId`);

--
-- Indexes for table `lab_image`
--
ALTER TABLE `lab_image`
  ADD PRIMARY KEY (`labId`,`imageId`);

--
-- Indexes for table `lab_member`
--
ALTER TABLE `lab_member`
  ADD PRIMARY KEY (`labId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `lab_scheduler`
--
ALTER TABLE `lab_scheduler`
  ADD PRIMARY KEY (`labId`,`schedulerId`),
  ADD KEY `schedulerId` (`schedulerId`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectAdminId` (`projectAdminId`),
  ADD KEY `labId` (`labId`);

--
-- Indexes for table `project_member`
--
ALTER TABLE `project_member`
  ADD PRIMARY KEY (`projectId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `project_scheduler`
--
ALTER TABLE `project_scheduler`
  ADD PRIMARY KEY (`projectId`,`schedulerId`),
  ADD KEY `schedulerId` (`schedulerId`);

--
-- Indexes for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `forLabId` (`forLabId`),
  ADD KEY `forProjectId` (`forProjectId`);

--
-- Indexes for table `scheduler`
--
ALTER TABLE `scheduler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `take_part_in_activity`
--
ALTER TABLE `take_part_in_activity`
  ADD PRIMARY KEY (`activityId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `tool`
--
ALTER TABLE `tool`
  ADD PRIMARY KEY (`id`),
  ADD KEY `labId` (`labId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`labId`) REFERENCES `lab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `apply_recruitment`
--
ALTER TABLE `apply_recruitment`
  ADD CONSTRAINT `apply_recruitment_ibfk_1` FOREIGN KEY (`recruitmentId`) REFERENCES `recruitment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `apply_recruitment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`labId`) REFERENCES `lab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lab`
--
ALTER TABLE `lab`
  ADD CONSTRAINT `lab_ibfk_1` FOREIGN KEY (`addressId`) REFERENCES `lab_address` (`labid`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lab_ibfk_2` FOREIGN KEY (`adminId`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lab_image`
--
ALTER TABLE `lab_image`
  ADD CONSTRAINT `lab_image_ibfk_1` FOREIGN KEY (`labId`) REFERENCES `lab` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lab_member`
--
ALTER TABLE `lab_member`
  ADD CONSTRAINT `lab_member_ibfk_1` FOREIGN KEY (`labId`) REFERENCES `lab` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lab_member_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lab_scheduler`
--
ALTER TABLE `lab_scheduler`
  ADD CONSTRAINT `lab_scheduler_ibfk_1` FOREIGN KEY (`labId`) REFERENCES `lab` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lab_scheduler_ibfk_2` FOREIGN KEY (`schedulerId`) REFERENCES `scheduler` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`projectAdminId`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`labId`) REFERENCES `lab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `project_member`
--
ALTER TABLE `project_member`
  ADD CONSTRAINT `project_member_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_member_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_scheduler`
--
ALTER TABLE `project_scheduler`
  ADD CONSTRAINT `project_scheduler_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_scheduler_ibfk_2` FOREIGN KEY (`schedulerId`) REFERENCES `scheduler` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD CONSTRAINT `recruitment_ibfk_1` FOREIGN KEY (`forLabId`) REFERENCES `lab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `recruitment_ibfk_2` FOREIGN KEY (`forProjectId`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `scheduler`
--
ALTER TABLE `scheduler`
  ADD CONSTRAINT `scheduler_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `take_part_in_activity`
--
ALTER TABLE `take_part_in_activity`
  ADD CONSTRAINT `take_part_in_activity_ibfk_1` FOREIGN KEY (`activityId`) REFERENCES `activity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `take_part_in_activity_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tool`
--
ALTER TABLE `tool`
  ADD CONSTRAINT `tool_ibfk_1` FOREIGN KEY (`labId`) REFERENCES `lab` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
