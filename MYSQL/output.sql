SHOW DATABASES;

CREATE database UDGTEAM;

USE UDGTEAM;

SHOW TABLES;

SELECT * from  PRODUCT;

SELECT * from USERS;

SELECT * from SELLER;

SELECT * from mysql.user;

CREATE USER 'usuario1'@'localhost' identified BY 'cucei';

GRANT ALL privileges ON UDGTEAM.* TO 'usuario1'@'localhost';