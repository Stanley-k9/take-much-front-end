CREATE DATABASE  IF NOT EXISTS `take_much` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `take_much`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: take_much
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `address_tbl`
--

DROP TABLE IF EXISTS `address_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_tbl` (
  `address_id` int NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `line1` varchar(255) DEFAULT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `zip_code` int NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_tbl`
--

LOCK TABLES `address_tbl` WRITE;
/*!40000 ALTER TABLE `address_tbl` DISABLE KEYS */;
INSERT INTO `address_tbl` VALUES (1,'jozi','south africa','13','malawe','07212345678','gauteng',1);
/*!40000 ALTER TABLE `address_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_tbl`
--

DROP TABLE IF EXISTS `category_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_tbl` (
  `cat_id` int NOT NULL,
  `cat_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_tbl`
--

LOCK TABLES `category_tbl` WRITE;
/*!40000 ALTER TABLE `category_tbl` DISABLE KEYS */;
INSERT INTO `category_tbl` VALUES (1,'shoes'),(2,'laptops');
/*!40000 ALTER TABLE `category_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (212);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details_tbl`
--

DROP TABLE IF EXISTS `order_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details_tbl` (
  `orders_id` int NOT NULL,
  `quantity` int NOT NULL,
  `id_id` int DEFAULT NULL,
  `order_id_order_id` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`orders_id`),
  KEY `FKnt5biui2j303e9n2vc7ltgi4v` (`id_id`),
  KEY `FK57dre8htmlbhqv64mp72dlwnl` (`order_id_order_id`),
  CONSTRAINT `FK57dre8htmlbhqv64mp72dlwnl` FOREIGN KEY (`order_id_order_id`) REFERENCES `order_tbl` (`order_id`),
  CONSTRAINT `FKnt5biui2j303e9n2vc7ltgi4v` FOREIGN KEY (`id_id`) REFERENCES `products_tbl` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details_tbl`
--

LOCK TABLES `order_details_tbl` WRITE;
/*!40000 ALTER TABLE `order_details_tbl` DISABLE KEYS */;
INSERT INTO `order_details_tbl` VALUES (1,12,2,1,'delivered'),(2,2,2,2,'delivered'),(3,4,2,2,'delivered'),(4,5,5,4,'delivered'),(5,7,4,1,'delivered'),(6,87,3,3,'delivered'),(7,85,6,4,'delivered'),(8,57,5,3,'pending'),(9,4,2,2,'pending'),(10,6,7,5,'pending'),(11,21,2,3,'pending'),(12,12,1,3,'pending'),(13,2,3,2,'pending'),(101,2,1,91,'pending'),(111,1,1,110,'pending'),(113,1,4,112,'pending'),(115,1,4,114,'pending'),(132,2,1,91,'pending'),(143,1,4,142,'pending'),(144,1,2,142,'pending'),(145,1,5,142,'pending'),(147,3,4,146,'pending'),(148,1,4,146,'pending'),(150,1,4,149,'pending'),(152,1,2,151,'pending'),(154,1,2,153,'pending'),(156,1,2,155,'pending'),(158,1,2,157,'pending'),(160,1,2,159,'pending'),(161,1,2,159,'pending'),(165,1,1,163,'pending'),(166,1,4,163,'pending'),(167,1,4,163,'pending'),(169,1,2,168,'pending'),(170,3,4,168,'pending'),(171,2,5,168,'pending'),(172,3,2,168,'pending'),(174,1,2,173,'pending'),(175,1,2,173,'pending'),(177,1,1,176,'delivered'),(178,1,1,176,'delivered'),(179,1,1,176,'delivered'),(194,1,1,193,'delivered'),(195,1,6,193,'pending'),(196,1,4,193,'delivered'),(198,1,1,197,'pending');
/*!40000 ALTER TABLE `order_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_tbl`
--

DROP TABLE IF EXISTS `order_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_tbl` (
  `order_id` int NOT NULL,
  `user_id_user_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK532vioj0oo07yrjy8mrgegrr6` (`user_id_user_id`),
  CONSTRAINT `FK532vioj0oo07yrjy8mrgegrr6` FOREIGN KEY (`user_id_user_id`) REFERENCES `user_tbl` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_tbl`
--

LOCK TABLES `order_tbl` WRITE;
/*!40000 ALTER TABLE `order_tbl` DISABLE KEYS */;
INSERT INTO `order_tbl` VALUES (1,1),(87,1),(96,1),(97,1),(98,1),(99,1),(100,1),(102,1),(103,1),(104,1),(105,1),(106,1),(107,1),(108,1),(109,1),(110,1),(112,1),(114,1),(116,1),(117,1),(121,1),(128,1),(133,1),(137,1),(138,1),(142,1),(146,1),(149,1),(151,1),(153,1),(155,1),(157,1),(173,1),(2,2),(90,2),(91,2),(176,2),(3,3),(6,3),(89,3),(159,3),(4,4),(88,4),(5,5),(7,5),(83,5),(84,5),(93,5),(193,67),(197,67),(94,68),(163,162),(164,162),(168,162);
/*!40000 ALTER TABLE `order_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_tbl`
--

DROP TABLE IF EXISTS `products_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_tbl` (
  `id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `short_desk` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `cat_id_cat_id` int DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5repi0a2n1kb8de9rgybyadqb` (`cat_id_cat_id`),
  CONSTRAINT `FK5repi0a2n1kb8de9rgybyadqb` FOREIGN KEY (`cat_id_cat_id`) REFERENCES `category_tbl` (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_tbl`
--

LOCK TABLES `products_tbl` WRITE;
/*!40000 ALTER TABLE `products_tbl` DISABLE KEYS */;
INSERT INTO `products_tbl` VALUES (1,'blond',90000000,7,'he works at reverside','liam',2,'https://i2-prod.essexlive.news/incoming/article3809949.ece/ALTERNATES/s1200b/1_Michelle-Taylor-posts-tribute-to-son-Liam-Taylor-who-was-stabbed-to-death-in-Writtle-Chelmsford.jpg'),(2,'de',656,563,'gfd','nike',2,'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-7c15a559-3af1-4d96-b703-90a8e8125908/air-zoom-superrep-hiit-class-shoe-sdWCtF.jpg'),(3,'dd3',50000,0,'fdg','dell',1,'https://www.westech.co.za/wp-content/uploads/2020/07/DELL-INSPIRON-3580.png'),(4,'ram',36,69,'g','hp',1,'https://laptoping.com/specs/wp-content/uploads/2019/11/HP-Pavilion-15t-6WU81AV_1-4-300x300.jpg'),(5,'big',15,9,'gd','nike',2,'https://wi-images.condecdn.net/image/dY9OKLRLpXZ/crop/2040/f/wired-nike.jpg'),(6,'iphone',1000,8,'b','mac',1,'https://photos5.appleinsider.com/gallery/31376-60118-Mac-Pro-l.jpg'),(7,'nokia',1665,50,'yakho','lumia',2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDRVWqXe8mDHzdjOCTzJjO1CMOaaMcTqiO-Q&usqp=CAU'),(204,'rt',2,546,NULL,'tdyfd',1,NULL);
/*!40000 ALTER TABLE `products_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `stan`
--

DROP TABLE IF EXISTS `stan`;
/*!50001 DROP VIEW IF EXISTS `stan`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `stan` AS SELECT 
 1 AS `id`,
 1 AS `description`,
 1 AS `price`,
 1 AS `quantity`,
 1 AS `short_desk`,
 1 AS `title`,
 1 AS `cat_id_cat_id`,
 1 AS `picture`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_tbl`
--

DROP TABLE IF EXISTS `user_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tbl` (
  `user_id` int NOT NULL,
  `age` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `logged_in` bit(1) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `address_id_address_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK74s0h140hxd3jsuwlw0x738pf` (`address_id_address_id`),
  CONSTRAINT `FK74s0h140hxd3jsuwlw0x738pf` FOREIGN KEY (`address_id_address_id`) REFERENCES `address_tbl` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tbl`
--

LOCK TABLES `user_tbl` WRITE;
/*!40000 ALTER TABLE `user_tbl` DISABLE KEYS */;
INSERT INTO `user_tbl` VALUES (1,20,'kitso@h','frfff','fdf','kkkkk',1,'customer','kisto',_binary '','https://thumbs.dreamstime.com/b/beauty-black-skin-woman-african-ethnic-female-face-young-african-american-model-long-afro-hair-smiling-model-isolated-163819623.jpg',1),(2,50,'liam@gmail.com','liam','tylar','12345',1,'customer','lim',_binary '','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdN1HpxdDyzwP4CblMPFgEXuD_kOBSLmceQ&usqp=CAU',1),(3,17,'moni@g','monica','mangayi','fdg',1,'customer','monn',_binary '','https://i.pinimg.com/originals/f8/4c/03/f84c03264eff3f6c766600b88a1b7e84.jpg',1),(4,16,'regator@gmail.com','regator','ndlovu','12345',1,'customer','rewg',_binary '','https://techcrunch.com/wp-content/uploads/2008/08/regatorlogo.png',1),(5,59,'sphi@g','sphi','jozi','gfdtgdgt',1,'customer','sphi',_binary '\0','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCBLRZRQAZB0CmgCSQubS_dBQw12WJpeUUw&usqp=CAU',1),(59,0,'prince@gmail.com','prince','ruzande','10111',0,'customer','Mr-prince',_binary '\0',NULL,1),(60,0,'stan@g','stan','st','dddd',0,'customer','ddd',_binary '\0',NULL,1),(61,0,'nancy@gmail.com','nancy','nancy','12345',0,'delivery','nany1111111111111111111111',_binary '','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgHj8htdUdcJim9q1s2y0saQnkC0d-gLMvdQ&usqp=CAU',1),(62,0,'tylor@gmail.com','limzaq','tylor','12345',0,'customer','tylorman',_binary '',NULL,1),(63,0,'k@gkgkg','kyle','lyke','12345',0,'customer','kkkk',_binary '',NULL,1),(64,0,'qqqq@wwww','qqqqqqqqqqq','qqqqqqqqqq','qqqqqqqqqqqqqqq',0,'customer','qqqqqqqqqqqqq',_binary '\0',NULL,1),(65,0,'ssssssssss@ccccccccc','ssssssss','ssssssssssss','dddddddddd',0,'customer','dddddddddd',_binary '\0',NULL,1),(66,0,'dfff@fdf','1111111','11111111111','ddddddddddd',0,'delivery','ddddddddddddd',_binary '\0',NULL,1),(67,22,'mkharricharan@gmail.com','Kyle','Harricharan','Kyle2410',0,'customer','Kylie_moon',_binary '',NULL,1),(68,0,'k@k','k','k','k',0,'customer','k',_binary '',NULL,1),(162,0,'kimo.com','Kitso','Moema','kitso',0,'customer','kitso',_binary '',NULL,1),(205,23,'stanley@gmail.com','stanley','maraba','12345',0,'admin','stanley',_binary '','https://www.completecontroller.com/wp-content/uploads/Hackers-Complete-Controller.jpg',1),(206,0,'kitso@h',NULL,NULL,'kkkkk',0,'customer',NULL,_binary '\0',NULL,NULL),(207,0,'asdadas',NULL,NULL,NULL,0,'customer',NULL,_binary '\0',NULL,NULL),(208,0,'asdasdasdawsd',NULL,NULL,NULL,0,'customer',NULL,_binary '\0',NULL,NULL),(209,0,'yizo@gmail.com','yizo','yizo','Yizo@g1234A',0,'customer','yizo',_binary '\0',NULL,NULL),(210,0,'kevinlegodi0123@gmail.com','DSDSDSDS','yizo','KKAJJ@CNS6788fds',0,'customer','malosestanleyaa@gmail.com',_binary '\0',NULL,NULL),(211,0,'mosie@gmail.com','mosie','tso','Mosie123/*',0,'delivery','mosie',_binary '\0',NULL,NULL);
/*!40000 ALTER TABLE `user_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'take_much'
--

--
-- Dumping routines for database 'take_much'
--

--
-- Final view structure for view `stan`
--

/*!50001 DROP VIEW IF EXISTS `stan`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `stan` AS select `products_tbl`.`id` AS `id`,`products_tbl`.`description` AS `description`,`products_tbl`.`price` AS `price`,`products_tbl`.`quantity` AS `quantity`,`products_tbl`.`short_desk` AS `short_desk`,`products_tbl`.`title` AS `title`,`products_tbl`.`cat_id_cat_id` AS `cat_id_cat_id`,`products_tbl`.`picture` AS `picture` from `products_tbl` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-31 15:37:04
