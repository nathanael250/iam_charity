-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 18, 2026 at 05:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iam_charity`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_impact_section`
--

CREATE TABLE `about_impact_section` (
  `id` int(11) NOT NULL DEFAULT 1,
  `impact_image_url` varchar(500) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_impact_section`
--

INSERT INTO `about_impact_section` (`id`, `impact_image_url`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '', NULL, '2026-06-16 21:13:25', '2026-06-16 21:13:25');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('super_admin','admin','case_manager','donation_manager','content_editor') DEFAULT 'admin',
  `status` enum('active','inactive') DEFAULT 'active',
  `last_login_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `full_name`, `email`, `password_hash`, `role`, `status`, `last_login_at`, `created_at`, `updated_at`) VALUES
(1, 'I AM Charity Admin', 'admin@iamcharity.com', 'scrypt$601569f897950eb627170d6165de693b$c62b9ba0001c554857a9f3d43125e969d61ca64bfbf1951419dd0c6f9109da9605c0141e7cd58b4d7984ed9d4a46bc3463c0f98f2136df2ccb1529c201acd9b6', 'admin', 'active', '2026-06-18 14:39:12', '2026-06-15 17:46:50', '2026-06-18 12:39:12');

-- --------------------------------------------------------

--
-- Table structure for table `beneficiaries`
--

CREATE TABLE `beneficiaries` (
  `id` int(11) NOT NULL,
  `beneficiary_code` varchar(50) NOT NULL,
  `display_name` varchar(200) NOT NULL,
  `beneficiary_type` enum('individual','family') DEFAULT 'family',
  `identifier_type` enum('national_id','passport','refugee_id','village_id','phone','none','other') DEFAULT 'none',
  `identifier_value` varchar(120) DEFAULT NULL,
  `representative_name` varchar(200) DEFAULT NULL,
  `representative_role` enum('self','family_leader','parent','guardian','other') DEFAULT 'self',
  `representative_phone` varchar(50) DEFAULT NULL,
  `contact_name` varchar(200) DEFAULT NULL,
  `contact_relationship` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(50) NOT NULL,
  `alternate_contact_phone` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `people_count` int(10) UNSIGNED DEFAULT 1,
  `status` enum('active','completed','inactive') DEFAULT 'active',
  `notes` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beneficiaries`
--

INSERT INTO `beneficiaries` (`id`, `beneficiary_code`, `display_name`, `beneficiary_type`, `identifier_type`, `identifier_value`, `representative_name`, `representative_role`, `representative_phone`, `contact_name`, `contact_relationship`, `contact_phone`, `alternate_contact_phone`, `location`, `people_count`, `status`, `notes`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'BEN-MQI6WXED-KH7X', 'MULENZI Fidelle', 'family', 'national_id', '1340172374234', 'MURENZI Jean', 'family_leader', '0781796824', 'Murenzi', 'parent', '0781796824', NULL, 'Kirehe', 8, 'active', NULL, 1, '2026-06-17 14:52:35', '2026-06-17 14:52:35');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `donor_name` varchar(150) DEFAULT NULL,
  `donor_email` varchar(150) DEFAULT NULL,
  `phone_country_code` varchar(10) DEFAULT NULL,
  `donor_phone` varchar(50) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'USD',
  `donation_type` enum('money','materials','food','clothes','construction_materials','other') DEFAULT 'money',
  `payment_method` enum('momo','bank_transfer','card','cash','other') DEFAULT 'momo',
  `payment_status` enum('pending','completed','failed','cancelled') DEFAULT 'pending',
  `transaction_reference` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `confirmed_by` int(11) DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `is_anonymous` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `project_id`, `donor_name`, `donor_email`, `phone_country_code`, `donor_phone`, `amount`, `currency`, `donation_type`, `payment_method`, `payment_status`, `transaction_reference`, `message`, `admin_notes`, `confirmed_by`, `confirmed_at`, `is_anonymous`, `created_at`, `updated_at`) VALUES
(1, 2, 'NIYOGUSHIMWA Natanael', 'nathanaelniyogushimwa@gmail.com', NULL, '+250781796824', 100.00, 'USD', 'money', 'momo', 'completed', 'MOCK-1781547306563-81AB44', 'ghjhk', NULL, NULL, NULL, 0, '2026-06-15 18:15:06', '2026-06-15 18:15:06'),
(2, 2, 'NIYOGUSHIMWA Natanael', 'nathanaelniyogushimwa@gmail.com', NULL, '+250781796824', 100.00, 'USD', 'money', 'momo', 'completed', 'MOCK-1781547335464-034F66', NULL, NULL, NULL, NULL, 0, '2026-06-15 18:15:35', '2026-06-15 18:15:35');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `beneficiary_id` int(11) DEFAULT NULL,
  `expense_category_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'USD',
  `expense_date` date NOT NULL,
  `paid_to` varchar(200) DEFAULT NULL,
  `payment_method` enum('cash','mobile_money','bank_transfer','card','other') DEFAULT 'cash',
  `reference` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `project_id`, `beneficiary_id`, `expense_category_id`, `description`, `amount`, `currency`, `expense_date`, `paid_to`, `payment_method`, `reference`, `notes`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 5, 1, 9, 'ewrtewrtrt', 10.00, 'USD', '2026-06-17', 'Driver', 'cash', '1234-AFFASFD', NULL, 1, '2026-06-17 15:28:54', '2026-06-17 15:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `expense_categories`
--

CREATE TABLE `expense_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_code` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense_categories`
--

INSERT INTO `expense_categories` (`id`, `category_name`, `category_code`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Transport', 'transport', 'Transport costs for support delivery or visits', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(2, 'Communication', 'communication', 'Phone, internet, SMS, or communication costs', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(3, 'Labor', 'labor', 'Labor or worker payments', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(4, 'Service Fee', 'service_fee', 'Service charges and processing fees', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(5, 'Medical Service', 'medical_service', 'Medical consultation or treatment service costs', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(6, 'School Fee', 'school_fee', 'School fees or education service costs', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(7, 'Rent', 'rent', 'Rent or temporary housing costs', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(8, 'Utilities', 'utilities', 'Water, electricity, or similar utility costs', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(9, 'Administration', 'administration', 'Administrative support costs', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(10, 'Other', 'other', 'Other expense category', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39');

-- --------------------------------------------------------

--
-- Table structure for table `home_impact_section`
--

CREATE TABLE `home_impact_section` (
  `id` int(11) NOT NULL DEFAULT 1,
  `eyebrow` varchar(120) NOT NULL DEFAULT 'Our Impact',
  `title` varchar(255) NOT NULL DEFAULT 'Real Change.\nReal People.',
  `description` text DEFAULT NULL,
  `button_label` varchar(120) NOT NULL DEFAULT 'See More Stories',
  `button_url` varchar(255) NOT NULL DEFAULT '/impact-stories',
  `before_label` varchar(80) NOT NULL DEFAULT 'Before',
  `before_image_url` varchar(500) DEFAULT NULL,
  `after_label` varchar(80) NOT NULL DEFAULT 'After',
  `after_image_url` varchar(500) DEFAULT NULL,
  `badge_icon` varchar(100) NOT NULL DEFAULT 'home',
  `badge_value` varchar(100) NOT NULL DEFAULT '0',
  `badge_label` varchar(120) NOT NULL DEFAULT 'Homes Completed',
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_impact_section`
--

INSERT INTO `home_impact_section` (`id`, `eyebrow`, `title`, `description`, `button_label`, `button_url`, `before_label`, `before_image_url`, `after_label`, `after_image_url`, `badge_icon`, `badge_value`, `badge_label`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Our Impact', 'Real Change.\nReal People.', 'We do not just build houses, we build stronger communities and brighter futures.', 'See More Stories', '/impact-stories', 'Before', '/uploads/cms/1781625522994-957921469-1781530399576-84503055-screenshot-2026-06-15-at-15-06-16.png', 'After', '/uploads/cms/1781625523016-642302520-1781527645930-466609662-screenshot-2026-06-15-at-14-44-54.png', 'home', '250+', 'Homes Completed', 1, '2026-06-16 15:57:19', '2026-06-16 15:58:43');

-- --------------------------------------------------------

--
-- Table structure for table `home_testimonials`
--

CREATE TABLE `home_testimonials` (
  `id` int(11) NOT NULL,
  `quote` text NOT NULL,
  `name` varchar(150) NOT NULL,
  `role` varchar(150) DEFAULT NULL,
  `initials` varchar(12) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_visible` tinyint(1) DEFAULT 1,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_testimonials`
--

INSERT INTO `home_testimonials` (`id`, `quote`, `name`, `role`, `initials`, `display_order`, `is_visible`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'It feels amazing to know my contribution helped build a home for a family. This organization is truly making a difference.', 'Anita M.', 'Donor', 'AM', 1, 1, NULL, '2026-06-16 20:41:40', '2026-06-16 20:41:40'),
(2, 'Volunteering with this team opened my eyes. The love and dedication here is inspiring.', 'Jean Paul.', 'Volunteer', 'JP', 2, 1, NULL, '2026-06-16 20:41:40', '2026-06-16 20:41:40'),
(3, 'Transparent, trustworthy, and effective. I am proud to support such an incredible mission.', 'Sarah K.', 'Monthly Donor', 'SK', 3, 0, 1, '2026-06-16 20:41:40', '2026-06-16 20:44:22');

-- --------------------------------------------------------

--
-- Table structure for table `impact_gallery_images`
--

CREATE TABLE `impact_gallery_images` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `gallery_position` tinyint(3) UNSIGNED DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `impact_page_hero`
--

CREATE TABLE `impact_page_hero` (
  `id` int(11) NOT NULL DEFAULT 1,
  `before_image_url` varchar(500) DEFAULT NULL,
  `after_image_url` varchar(500) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `impact_page_hero`
--

INSERT INTO `impact_page_hero` (`id`, `before_image_url`, `after_image_url`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '/uploads/cms/1781649820732-903254742-before-cjzh758p.png', '/uploads/cms/1781649820757-704112125-after-b4iibtil.png', 1, '2026-06-16 22:40:29', '2026-06-16 22:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `impact_page_statistics`
--

CREATE TABLE `impact_page_statistics` (
  `id` int(11) NOT NULL,
  `statistic_key` varchar(100) NOT NULL,
  `label` varchar(150) NOT NULL,
  `value` varchar(100) NOT NULL DEFAULT '0',
  `icon` varchar(100) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_visible` tinyint(1) DEFAULT 1,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `impact_page_statistics`
--

INSERT INTO `impact_page_statistics` (`id`, `statistic_key`, `label`, `value`, `icon`, `display_order`, `is_visible`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'families_helped', 'Families Helped', '0', 'groups', 1, 1, NULL, '2026-06-16 22:40:29', '2026-06-16 22:40:29'),
(2, 'volunteers_involved', 'Volunteers Involved', '0', 'volunteer_activism', 2, 1, NULL, '2026-06-16 22:40:29', '2026-06-16 22:40:29'),
(3, 'supporters', 'Supporters', '0', 'favorite', 3, 1, NULL, '2026-06-16 22:40:29', '2026-06-16 22:40:29'),
(4, 'communities_reached', 'Communities Reached', '0', 'location_on', 4, 1, NULL, '2026-06-16 22:40:29', '2026-06-16 22:40:29');

-- --------------------------------------------------------

--
-- Table structure for table `impact_statistics`
--

CREATE TABLE `impact_statistics` (
  `id` int(11) NOT NULL,
  `statistic_key` varchar(100) NOT NULL,
  `label` varchar(150) NOT NULL,
  `value` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_visible` tinyint(1) DEFAULT 1,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `impact_statistics`
--

INSERT INTO `impact_statistics` (`id`, `statistic_key`, `label`, `value`, `description`, `icon`, `display_order`, `is_visible`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'families_supported', 'Families Supported', '10', 'Families who have received support', 'home', 1, 1, 1, '2026-06-15 11:36:28', '2026-06-16 15:31:09'),
(2, 'completed_cases', 'Completed Support Cases', '100+', 'Support cases successfully completed', 'verified', 2, 1, 1, '2026-06-15 11:36:28', '2026-06-16 15:33:10'),
(5, 'families_housed', 'Families Housed', '30+', 'Since 2018', 'home', 3, 1, 1, '2026-06-16 15:31:58', '2026-06-16 15:40:04'),
(6, 'stable_housing', 'Still in Stable Housing', '30+', 'After 2 Years', 'verified_user', 4, 1, 1, '2026-06-16 15:31:58', '2026-06-16 15:40:04');

-- --------------------------------------------------------

--
-- Table structure for table `materials_used`
--

CREATE TABLE `materials_used` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `beneficiary_id` int(11) DEFAULT NULL,
  `material_name` varchar(200) NOT NULL,
  `category` enum('food','education','housing','health','clothing','hygiene','construction','other') DEFAULT 'other',
  `quantity` decimal(12,2) NOT NULL DEFAULT 0.00,
  `unit_id` int(11) NOT NULL,
  `unit_cost` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_cost` decimal(12,2) GENERATED ALWAYS AS (`quantity` * `unit_cost`) STORED,
  `currency` varchar(10) DEFAULT 'USD',
  `date_used` date NOT NULL,
  `notes` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials_used`
--

INSERT INTO `materials_used` (`id`, `project_id`, `beneficiary_id`, `material_name`, `category`, `quantity`, `unit_id`, `unit_cost`, `currency`, `date_used`, `notes`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'werqwer', 'food', 2.00, 5, 100.00, 'USD', '2026-06-17', NULL, 1, '2026-06-17 15:28:19', '2026-06-17 15:28:19');

-- --------------------------------------------------------

--
-- Table structure for table `material_units`
--

CREATE TABLE `material_units` (
  `id` int(11) NOT NULL,
  `unit_name` varchar(80) NOT NULL,
  `unit_code` varchar(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_units`
--

INSERT INTO `material_units` (`id`, `unit_name`, `unit_code`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Piece', 'piece', 'Single item or countable unit', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(2, 'Kilogram', 'kg', 'Weight measured in kilograms', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(3, 'Gram', 'g', 'Weight measured in grams', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(4, 'Liter', 'l', 'Volume measured in liters', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(5, 'Bag', 'bag', 'Bag or sack', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(6, 'Box', 'box', 'Box or carton', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(7, 'Bundle', 'bundle', 'Grouped bundle of items', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(8, 'Pair', 'pair', 'Two matching items', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39'),
(9, 'Meter', 'm', 'Length measured in meters', 1, '2026-06-17 11:19:39', '2026-06-17 11:19:39');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone_country_code` varchar(10) DEFAULT '+250',
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied','archived') DEFAULT 'unread',
  `assigned_to` int(11) DEFAULT NULL,
  `replied_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `status` enum('active','unsubscribed') DEFAULT 'active',
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `status`, `subscribed_at`) VALUES
(1, 'nathanaelniyogushimwa@gmail.com', 'active', '2026-06-15 18:09:29');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `beneficiary_name` varchar(200) DEFAULT NULL,
  `beneficiary_type` enum('individual','family','community','organization') DEFAULT 'family',
  `slug` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `full_description` longtext DEFAULT NULL,
  `support_needed` text DEFAULT NULL,
  `category` enum('housing','daily_needs','education','health','emergency','other') DEFAULT 'housing',
  `urgency` enum('normal','important','urgent','critical') DEFAULT 'normal',
  `location` varchar(255) DEFAULT NULL,
  `people_count` int(10) UNSIGNED DEFAULT 1,
  `currency` varchar(10) DEFAULT 'USD',
  `target_amount` decimal(12,2) DEFAULT 0.00,
  `raised_amount` decimal(12,2) DEFAULT 0.00,
  `main_image` varchar(500) DEFAULT NULL,
  `status` enum('draft','active','paused','completed') DEFAULT 'draft',
  `is_featured` tinyint(1) DEFAULT 0,
  `consent_confirmed` tinyint(1) DEFAULT 0,
  `published_at` datetime DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(500) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `beneficiary_name`, `beneficiary_type`, `slug`, `short_description`, `full_description`, `support_needed`, `category`, `urgency`, `location`, `people_count`, `currency`, `target_amount`, `raised_amount`, `main_image`, `status`, `is_featured`, `consent_confirmed`, `published_at`, `meta_title`, `meta_description`, `start_date`, `end_date`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'A Safe Home for the Kalambizi Family', NULL, 'family', 'a-safe-home-for-the-kalambizi-family', 'A family of five needs support to replace an unsafe temporary shelter with a secure home.', 'The Kalambizi family currently lives in a structure that does not provide enough protection during heavy rain. The family needs help to build a safe and dignified home. Support will provide construction materials, skilled labour, roofing, doors, windows, and essential household items.\n', NULL, 'housing', 'normal', 'Masaka, Kigali', 1, 'USD', 3000.00, 1000.00, '/uploads/projects/1781527645930-466609662-screenshot-2026-06-15-at-14-44-54.png', 'active', 0, 0, NULL, NULL, NULL, '2026-05-30', '2026-09-28', NULL, '2026-06-15 12:47:25', '2026-06-15 13:18:06'),
(2, 'School Materials for Children in Rulindo', NULL, 'family', 'school-materials-for-children-in-rulindo', 'Thirty children need books, uniforms, shoes, and other materials for the coming school term.', 'Several families in Rulindo are unable to provide all the materials their children need for school. This support case will provide notebooks, pens, school bags, uniforms, shoes, and required learning materials for thirty children so they can attend school prepared and with confidence.', NULL, 'education', 'normal', 'Rulindo District, Northern Province', 1, 'USD', 2300.00, 700.00, '/uploads/projects/1781530399576-84503055-screenshot-2026-06-15-at-15-06-16.png', 'active', 0, 0, NULL, NULL, NULL, '2026-06-08', '2026-08-29', NULL, '2026-06-15 13:07:26', '2026-06-15 18:15:35'),
(5, 'Essential Support for Elderly Households', NULL, 'family', 'essential-support-for-elderly-households', 'Ten elderly people living alone need food, hygiene supplies, bedding, and regular home visits.', 'This case supports elderly people who have limited family assistance and difficulty meeting essential daily needs. Donations will provide food packages, hygiene supplies, blankets, mattresses, and coordinated volunteer visits throughout the support period.', NULL, 'daily_needs', 'normal', 'Mbyo, Bugesera', 1, 'USD', 1800.00, 700.00, '/uploads/projects/1781530720735-105638003-screenshot-2026-06-15-at-15-37-58.png', 'active', 0, 0, NULL, NULL, NULL, '2026-06-15', '2026-10-15', NULL, '2026-06-15 13:38:40', '2026-06-15 13:38:40');

-- --------------------------------------------------------

--
-- Table structure for table `project_images`
--

CREATE TABLE `project_images` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `is_main` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_images`
--

INSERT INTO `project_images` (`id`, `project_id`, `image_url`, `caption`, `is_main`, `created_at`) VALUES
(1, 1, '/uploads/projects/1781527645930-466609662-screenshot-2026-06-15-at-14-44-54.png', 'Current condition of the family', 1, '2026-06-15 12:47:25'),
(2, 1, '/uploads/projects/1781527645939-139877356-screenshot-2026-06-15-at-14-46-30.png', 'Construction area', 0, '2026-06-15 12:47:25'),
(3, 2, '/uploads/projects/1781530399576-84503055-screenshot-2026-06-15-at-15-06-16.png', 'Students in class', 1, '2026-06-15 13:33:19'),
(4, 2, '/uploads/projects/1781530399586-911272272-screenshot-2026-06-15-at-15-05-37.png', 'Student to support', 0, '2026-06-15 13:33:19'),
(5, 5, '/uploads/projects/1781530720735-105638003-screenshot-2026-06-15-at-15-37-58.png', NULL, 1, '2026-06-15 13:38:40');

-- --------------------------------------------------------

--
-- Table structure for table `project_updates`
--

CREATE TABLE `project_updates` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `support_summary` text DEFAULT NULL,
  `amount_delivered` decimal(12,2) DEFAULT 0.00,
  `people_helped` int(10) UNSIGNED DEFAULT 0,
  `completion_date` date DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `created_by` int(11) DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `before_image_url` varchar(500) DEFAULT NULL,
  `after_image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `setting_group` varchar(100) DEFAULT 'general',
  `setting_key` varchar(150) NOT NULL,
  `setting_value` longtext DEFAULT NULL,
  `value_type` enum('text','number','boolean','json','image') DEFAULT 'text',
  `is_public` tinyint(1) DEFAULT 1,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_group`, `setting_key`, `setting_value`, `value_type`, `is_public`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'notifications', 'notification_settings', '{\"recipient_email\":\"nathanaelniyogushimwa@gmail.com\",\"triggers\":{\"donations\":true,\"volunteer_applications\":true,\"contact_messages\":true,\"newsletter_signups\":true}}', 'json', 0, 1, '2026-06-18 12:59:15', '2026-06-18 13:00:03');

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `id` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone_country_code` varchar(10) DEFAULT '+250',
  `phone` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `volunteer_type` enum('construction','teaching','medical','food_distribution','community_work','administration','other') DEFAULT 'other',
  `preferred_support_area` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `status` enum('pending','contacted','approved','rejected','inactive') DEFAULT 'pending',
  `reviewed_by` int(11) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`id`, `full_name`, `email`, `phone_country_code`, `phone`, `address`, `image_url`, `skills`, `volunteer_type`, `preferred_support_area`, `availability`, `message`, `admin_notes`, `status`, `reviewed_by`, `reviewed_at`, `created_at`, `updated_at`) VALUES
(1, 'NIYOGUSHIMWA Natanael', 'nathanaelniyogushimwa@gmail.com', '+250', '+250781796824', 'Kigali', NULL, 'Construction and site support', 'construction', NULL, 'Weekdays | Available from 2026-06-15 | Preferred contact: Phone call | Support: Give physical help or field support', 'We are ready to work together to transform the world', NULL, 'approved', NULL, NULL, '2026-06-15 17:55:08', '2026-06-15 17:56:25'),
(2, 'NIYOGUSHIMWA Natanael', 'nathanaelniyogushimwa1@gmail.com', '+250', '+250781796824', 'Rusizi', '/uploads/volunteers/1781546701497-796579958-whatsapp-image-2026-05-23-at-10-24-32.jpeg', 'Construction and site support, Teaching and child mentoring, Health or counseling support, Media, design, or communication, Driving and logistics, Event organization', 'community_work', NULL, 'Weekdays | Available from 2026-06-15 | Preferred contact: Phone call | Support: Give my time', 'fghjk', NULL, 'approved', NULL, NULL, '2026-06-15 18:05:01', '2026-06-15 18:51:17'),
(3, 'MUYIBIZI Denny', 'nathanaelniyogushimwa@gmail.com', '+250', '+250781796824', 'Kicukiro', '/uploads/volunteers/1781546834661-624367141-zuse-logo.png', 'Construction and site support, Event organization, Driving and logistics, Teaching and child mentoring', 'community_work', NULL, 'Weekdays | Available from 2026-06-15 | Preferred contact: Email | Support: Give my time', 'asfasfd', NULL, 'approved', NULL, NULL, '2026-06-15 18:07:14', '2026-06-15 18:26:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_impact_section`
--
ALTER TABLE `about_impact_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `beneficiary_code` (`beneficiary_code`),
  ADD KEY `fk_beneficiaries_admin` (`created_by`),
  ADD KEY `idx_beneficiaries_code` (`beneficiary_code`),
  ADD KEY `idx_beneficiaries_status` (`status`),
  ADD KEY `idx_beneficiaries_type` (`beneficiary_type`),
  ADD KEY `idx_beneficiaries_identifier` (`identifier_type`,`identifier_value`),
  ADD KEY `idx_beneficiaries_contact_phone` (`contact_phone`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_donations_confirmed_admin` (`confirmed_by`),
  ADD KEY `idx_donations_status` (`payment_status`),
  ADD KEY `idx_donations_project` (`project_id`),
  ADD KEY `idx_donations_reference` (`transaction_reference`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_expenses_admin` (`created_by`),
  ADD KEY `idx_expenses_beneficiary` (`beneficiary_id`),
  ADD KEY `idx_expenses_category` (`expense_category_id`),
  ADD KEY `idx_expenses_date` (`expense_date`),
  ADD KEY `fk_expenses_project` (`project_id`);

--
-- Indexes for table `expense_categories`
--
ALTER TABLE `expense_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`),
  ADD UNIQUE KEY `category_code` (`category_code`);

--
-- Indexes for table `home_impact_section`
--
ALTER TABLE `home_impact_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_testimonials`
--
ALTER TABLE `home_testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `impact_gallery_images`
--
ALTER TABLE `impact_gallery_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_impact_gallery_project` (`project_id`);

--
-- Indexes for table `impact_page_hero`
--
ALTER TABLE `impact_page_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `impact_page_statistics`
--
ALTER TABLE `impact_page_statistics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `statistic_key` (`statistic_key`);

--
-- Indexes for table `impact_statistics`
--
ALTER TABLE `impact_statistics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `statistic_key` (`statistic_key`),
  ADD KEY `fk_statistics_admin` (`updated_by`);

--
-- Indexes for table `materials_used`
--
ALTER TABLE `materials_used`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_materials_admin` (`created_by`),
  ADD KEY `idx_materials_beneficiary` (`beneficiary_id`),
  ADD KEY `idx_materials_category` (`category`),
  ADD KEY `idx_materials_unit` (`unit_id`),
  ADD KEY `idx_materials_date` (`date_used`),
  ADD KEY `fk_materials_project` (`project_id`);

--
-- Indexes for table `material_units`
--
ALTER TABLE `material_units`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unit_name` (`unit_name`),
  ADD UNIQUE KEY `unit_code` (`unit_code`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_messages_assigned_admin` (`assigned_to`),
  ADD KEY `idx_messages_status` (`status`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_projects_admin` (`created_by`),
  ADD KEY `idx_projects_status` (`status`),
  ADD KEY `idx_projects_featured` (`is_featured`),
  ADD KEY `idx_projects_category` (`category`);

--
-- Indexes for table `project_images`
--
ALTER TABLE `project_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_project_images_project` (`project_id`);

--
-- Indexes for table `project_updates`
--
ALTER TABLE `project_updates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_project_updates_project` (`project_id`),
  ADD KEY `fk_project_updates_admin` (`created_by`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`),
  ADD KEY `fk_settings_admin` (`updated_by`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_volunteers_reviewed_admin` (`reviewed_by`),
  ADD KEY `idx_volunteers_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `expense_categories`
--
ALTER TABLE `expense_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `home_testimonials`
--
ALTER TABLE `home_testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `impact_gallery_images`
--
ALTER TABLE `impact_gallery_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `impact_page_statistics`
--
ALTER TABLE `impact_page_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `impact_statistics`
--
ALTER TABLE `impact_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `materials_used`
--
ALTER TABLE `materials_used`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `material_units`
--
ALTER TABLE `material_units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `project_images`
--
ALTER TABLE `project_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `project_updates`
--
ALTER TABLE `project_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  ADD CONSTRAINT `fk_beneficiaries_admin` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `fk_donations_confirmed_admin` FOREIGN KEY (`confirmed_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_donations_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `fk_expenses_admin` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_expenses_beneficiary` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiaries` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_expenses_category` FOREIGN KEY (`expense_category_id`) REFERENCES `expense_categories` (`id`),
  ADD CONSTRAINT `fk_expenses_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `impact_gallery_images`
--
ALTER TABLE `impact_gallery_images`
  ADD CONSTRAINT `fk_impact_gallery_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `impact_statistics`
--
ALTER TABLE `impact_statistics`
  ADD CONSTRAINT `fk_statistics_admin` FOREIGN KEY (`updated_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `materials_used`
--
ALTER TABLE `materials_used`
  ADD CONSTRAINT `fk_materials_admin` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_materials_beneficiary` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiaries` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_materials_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_materials_unit` FOREIGN KEY (`unit_id`) REFERENCES `material_units` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_assigned_admin` FOREIGN KEY (`assigned_to`) REFERENCES `admins` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_projects_admin` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `project_images`
--
ALTER TABLE `project_images`
  ADD CONSTRAINT `fk_project_images_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_updates`
--
ALTER TABLE `project_updates`
  ADD CONSTRAINT `fk_project_updates_admin` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_project_updates_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD CONSTRAINT `fk_settings_admin` FOREIGN KEY (`updated_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD CONSTRAINT `fk_volunteers_reviewed_admin` FOREIGN KEY (`reviewed_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
