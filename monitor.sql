-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2022 at 08:33 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `monitor`
--

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `responseDuration` bigint(20) DEFAULT NULL,
  `successful` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `created_at`, `timestamp`, `responseDuration`, `successful`) VALUES
(1, '2022-06-06 21:56:52', '2022-06-06 21:56:52', 127, 1),
(2, '2022-06-06 21:58:08', '2022-06-06 21:58:08', 985, 1),
(3, '2022-06-06 22:15:02', '2022-06-06 22:15:02', 2133, 1),
(4, '2022-06-06 22:28:39', '2022-06-06 22:28:39', 1447, 1),
(5, '2022-06-06 22:30:01', '2022-06-06 22:30:01', 828, 1),
(6, '2022-06-06 22:30:06', '2022-06-06 22:30:06', 808, 1),
(7, '2022-06-06 22:35:01', '2022-06-06 22:35:01', 943, 1),
(8, '2022-06-06 22:51:37', '2022-06-06 22:51:37', 2737, 1),
(9, '2022-06-06 22:51:47', '2022-06-06 22:51:47', 718, 1),
(10, '2022-06-06 22:52:34', '2022-06-06 22:52:34', NULL, 0),
(11, '2022-06-06 22:54:17', '2022-06-06 22:54:17', NULL, 0),
(12, '2022-06-06 22:55:00', '2022-06-06 22:55:00', NULL, 0),
(13, '2022-06-06 23:00:00', '2022-06-06 23:00:00', NULL, 0),
(14, '2022-06-06 23:05:01', '2022-06-06 23:05:01', NULL, 0),
(15, '2022-06-06 23:10:03', '2022-06-06 23:10:03', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
