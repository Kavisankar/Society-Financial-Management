-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: society_financial_management
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SPRING_SESSION`
--

DROP TABLE IF EXISTS `SPRING_SESSION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SPRING_SESSION` (
  `PRIMARY_ID` char(36) NOT NULL,
  `SESSION_ID` char(36) NOT NULL,
  `CREATION_TIME` bigint NOT NULL,
  `LAST_ACCESS_TIME` bigint NOT NULL,
  `MAX_INACTIVE_INTERVAL` int NOT NULL,
  `EXPIRY_TIME` bigint NOT NULL,
  `PRINCIPAL_NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PRIMARY_ID`),
  UNIQUE KEY `SPRING_SESSION_IX1` (`SESSION_ID`),
  KEY `SPRING_SESSION_IX2` (`EXPIRY_TIME`),
  KEY `SPRING_SESSION_IX3` (`PRINCIPAL_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SPRING_SESSION_ATTRIBUTES`
--

DROP TABLE IF EXISTS `SPRING_SESSION_ATTRIBUTES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SPRING_SESSION_ATTRIBUTES` (
  `SESSION_PRIMARY_ID` char(36) NOT NULL,
  `ATTRIBUTE_NAME` varchar(200) NOT NULL,
  `ATTRIBUTE_BYTES` blob NOT NULL,
  PRIMARY KEY (`SESSION_PRIMARY_ID`,`ATTRIBUTE_NAME`),
  CONSTRAINT `SPRING_SESSION_ATTRIBUTES_FK` FOREIGN KEY (`SESSION_PRIMARY_ID`) REFERENCES `SPRING_SESSION` (`PRIMARY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `defaulters`
--

DROP TABLE IF EXISTS `defaulters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defaulters` (
  `member_id` int NOT NULL,
  `month` int NOT NULL,
  `year` year NOT NULL,
  PRIMARY KEY (`member_id`,`month`,`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `defaulters_BEFORE_INSERT` BEFORE INSERT ON `defaulters` FOR EACH ROW BEGIN
    DECLARE v_amount_to_pay Integer;
    
    IF (NEW.member_id IS NULL) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Member ID is required';
	END IF;
    
    IF (NEW.year IS NULL) THEN
		SET NEW.year = YEAR(NOW());
	END IF;
    
    IF (NEW.year = YEAR(NOW())) THEN
		IF (NEW.month IS NULL) THEN
			SET NEW.month = MONTH(NOW());
		ELSEIF (NEW.month > MONTH(NOW()) OR NEW.month < 1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid month';
		END IF;
	ELSEIF (NEW.year > YEAR(NOW()) OR NEW.year < 2000) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid year';
	ELSEIF (NEW.month > 12 OR NEW.month < 1) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid month';
	END IF;
    
    SET v_amount_to_pay = ( 
		SELECT 
			amount_to_pay
		FROM
			society_financial_management.members
		WHERE
			id = NEW.member_id
		);

    UPDATE 
		society_financial_management.members 
	SET 
		amount_to_pay = (v_amount_to_pay + 100)
	WHERE
		id = NEW.member_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `defaulters_BEFORE_UPDATE` BEFORE UPDATE ON `defaulters` FOR EACH ROW BEGIN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot update rows';
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `defaulters_BEFORE_DELETE` BEFORE DELETE ON `defaulters` FOR EACH ROW BEGIN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete rows';
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `events_and_maintenance`
--

DROP TABLE IF EXISTS `events_and_maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events_and_maintenance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `starting_date` date NOT NULL,
  `ending_date` date NOT NULL,
  `expenditure` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `events_and_maintenance_BEFORE_INSERT` BEFORE INSERT ON `events_and_maintenance` FOR EACH ROW BEGIN
    DECLARE v_total_amount Integer;
    
    IF (NEW.starting_date < NOW()) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid starting date';
	ELSEIF (NEW.starting_date > NEW.ending_date) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid dates';
	END IF;
    
    SET v_total_amount = CAST((SELECT amount_having FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
		- CAST((SELECT amount_needed FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
        - CAST(NEW.expenditure AS SIGNED);
	
    IF (v_total_amount > 0) THEN
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = v_total_amount,
            amount_needed = 0
		WHERE
			id = 1;
	ELSE
		SET v_total_amount = -1 * v_total_amount;
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = 0,
            amount_needed = v_total_amount
		WHERE
			id = 1;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `events_and_maintenance_BEFORE_UPDATE` BEFORE UPDATE ON `events_and_maintenance` FOR EACH ROW BEGIN
	DECLARE v_total_amount Integer;
    
    IF (NEW.starting_date > NEW.ending_date) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid dates';
	ELSEIF (OLD.ending_date < NOW()) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot update ended event';
	END IF;
    
    SET v_total_amount = CAST((SELECT amount_having FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
		- CAST((SELECT amount_needed FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
        - CAST(NEW.expenditure AS SIGNED)
        + CAST(OLD.expenditure AS SIGNED);
	
    IF (v_total_amount > 0) THEN
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = v_total_amount,
            amount_needed = 0
		WHERE
			id = 1;
	ELSE
		SET v_total_amount = -1 * v_total_amount;
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = 0,
            amount_needed = v_total_amount
		WHERE
			id = 1;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `events_and_maintenance_BEFORE_DELETE` BEFORE DELETE ON `events_and_maintenance` FOR EACH ROW BEGIN
	DECLARE v_total_amount Integer;
    
    IF (OLD.ending_date < NOW()) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete ended event';
	END IF;
    
    SET v_total_amount = CAST((SELECT amount_having FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
		- CAST((SELECT amount_needed FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
        + CAST(OLD.expenditure AS SIGNED);
	
    IF (v_total_amount > 0) THEN
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = v_total_amount,
            amount_needed = 0
		WHERE
			id = 1;
	ELSE
		SET v_total_amount = -1 * v_total_amount;
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = 0,
            amount_needed = v_total_amount
		WHERE
			id = 1;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `households`
--

DROP TABLE IF EXISTS `households`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `households` (
  `flat_no` varchar(5) NOT NULL,
  `member_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`flat_no`),
  KEY `fk_households_1_idx` (`member_id`),
  CONSTRAINT `fk_households_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `password` varchar(75) NOT NULL,
  `active_status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Manager_ID_UNIQUE` (`id`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=50013 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `password` varchar(75) NOT NULL,
  `amount_to_pay` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Member_ID_UNIQUE` (`id`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1000009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int unsigned NOT NULL,
  `transferred_by` int unsigned NOT NULL,
  `approved_by` int unsigned NOT NULL,
  `transaction_time` timestamp(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transactions_1_idx` (`transferred_by`),
  KEY `fk_transactions_2_idx` (`approved_by`),
  CONSTRAINT `fk_transactions_1` FOREIGN KEY (`transferred_by`) REFERENCES `members` (`id`),
  CONSTRAINT `fk_transactions_2` FOREIGN KEY (`approved_by`) REFERENCES `managers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `transactions_BEFORE_INSERT` BEFORE INSERT ON `transactions` FOR EACH ROW BEGIN
	DECLARE v_total_amount Integer;
    DECLARE v_amount_to_pay Integer;
    
    SET NEW.transaction_time = CURRENT_TIMESTAMP();
    
    SET v_total_amount = CAST((SELECT amount_having FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
		- CAST((SELECT amount_needed FROM society_financial_management.treasury WHERE id = 1) AS SIGNED)
        + CAST(NEW.amount AS SIGNED);
	
    IF (v_total_amount > 0) THEN
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = v_total_amount,
            amount_needed = 0
		WHERE
			id = 1;
	ELSE
		SET v_total_amount = -1 * v_total_amount;
		UPDATE 
			society_financial_management.treasury 
		SET 
			amount_having = 0,
            amount_needed = v_total_amount
		WHERE
			id = 1;
    END IF;
    
    SET v_amount_to_pay = CAST((SELECT amount_to_pay FROM society_financial_management.members WHERE id = NEW.transferred_by) AS SIGNED)
        - CAST(NEW.amount AS SIGNED);
    
    IF (v_amount_to_pay < 0) THEN
		SET v_amount_to_pay = 0;
	END IF;
    
    UPDATE society_financial_management.members SET amount_to_pay = v_amount_to_pay	WHERE id = NEW.transferred_by;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `transactions_BEFORE_UPDATE` BEFORE UPDATE ON `transactions` FOR EACH ROW BEGIN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot update a transaction';
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `transactions_BEFORE_DELETE` BEFORE DELETE ON `transactions` FOR EACH ROW BEGIN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete a transaction';
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `treasury`
--

DROP TABLE IF EXISTS `treasury`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treasury` (
  `id` int NOT NULL,
  `amount_having` int NOT NULL,
  `amount_needed` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `treasury_BEFORE_INSERT` BEFORE INSERT ON `treasury` FOR EACH ROW BEGIN
	DECLARE treasury_no_rows integer;
    SELECT COUNT(*) INTO treasury_no_rows FROM society_financial_management.treasury;
    IF treasury_no_rows > 0
    THEN
		signal sqlstate '45000' set message_text = 'Cannot insert more than one row';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kavi`@`localhost`*/ /*!50003 TRIGGER `treasury_BEFORE_DELETE` BEFORE DELETE ON `treasury` FOR EACH ROW BEGIN
	signal sqlstate '45000' set message_text = 'Cannot delete rows';
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'society_financial_management'
--

--
-- Dumping routines for database 'society_financial_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-12 17:30:19
