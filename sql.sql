 
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


INSERT INTO `karyawan` (`id`, `name`, `gaji`, `email`) VALUES
	(1, 'Yogesh', '30000', 'yogesh@makitweb.com'),
	(2, 'Vishal', '28000', 'vishal@gmail.com'),
	(3, 'Vijay', '35000', 'vijayec@yahoo.com'),
	(4, 'Rahul', '25000', '<b>yogesh@makitweb.com</b>'),
	(5, 'Sonarika', '50000', 'bsonarika@gmail.com'),
	(6, 'Jitentendre', '48000', 'jiten94@yahoo.com'),
	(7, 'Aditya', '36000', 'aditya@gmail.com'),
	(8, 'Anil', '32000', 'anilsingh@gmail.com'),
	(9, 'Sunil', '48000', 'sunil1993@gmail.com'),
	(10, 'Akilesh', '52000', 'akileshsahu@yahoo.com'),
	(11, 'Raj', '48000', 'rajsingh@gmail.com'),
	(12, 'Mayank', '54000', 'mpatidar@gmail.com'),
	(13, 'Shalu', '43000', 'gshalu521@gmail.com'),
	(14, 'Ravi', '32000', 'ravisharma21@yahoo.com'),
	(15, 'Shruti', '45000', 'shruti@gmail.com'),
	(16, 'Rishi', '38000', 'rishi121@gmail.com'),
	(17, 'Rohan', '47000', 'rohansingh@gmail.com'),
	(18, 'Priya', '28000', 'priya1992@gmail.com'),
	(19, 'Rakesh', '34000', 'rakesh@yahoo.com'),
	(20, 'Vinay', '34000', 'vinaysingh@gmail.com'),
	(21, 'Tanu', '41000', 'Tanu@gmail.com'),
	(22, 'Ajay', '28000', 'ajay93@gmail.com'),
	(23, 'Nikhil', '46000', 'nikhil@gmail.com'),
	(24, 'Arav', '28000', 'aravsingh@yahoo.com'),
	(25, 'Madhu', '32000', 'madhu@gmail.com'),
	(26, 'Sagar', '44000', 'sagar@gmail.com'),
	(27, 'Anju ', '30000', 'anju@gmail.com'),
	(28, 'Rajat', '28000', 'rajat@gmail.com'),
	(29, 'Anjali', '32000', 'anjali@gmail.com'),
	(30, 'Saloni', '32000', 'saloni@gmail.com'),
	(31, 'Mayur', '28000', 'mayur@gmail.com'),
	(32, 'Pankaj', '32000', 'pankaj@gmail.com'),
	(33, 'Hrithik', '33000', 'hrithik@gmail.com');
 
