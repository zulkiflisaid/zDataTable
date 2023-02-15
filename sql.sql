 
CREATE DATABASE IF NOT EXISTS `zdatatable` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */;
USE `zdatatable`;

-- Dumping structure for table quasar_pos.karyawan
CREATE TABLE IF NOT EXISTS `karyawan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `gaji` varchar(20) NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
 