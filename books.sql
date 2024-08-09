create database bookstore;

CREATE TABLE `bookstore`.`books` (
  `id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `author` VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
);


insert into books value 
(3,"Laskar Pelangi","Andrea Hirata"),
(4,"Filosofi Kopi","Dewi Lestari"),
(1,"Nanti Kita Cerita tentang Hari Ini","Marchella FP"),
(2,"Rudy: Kisah Masa Muda Sang Visioner","Gina S. Noer");

delete from books where title = "Madilog";