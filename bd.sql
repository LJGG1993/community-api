CREATE DATABASE IF NOT EXISTS community;
use community;

create table users(
	id INT PRIMARY KEY AUTO_INCREMENT,
	mail VARCHAR(100),
	password VARCHAR(500),
	name VARCHAR(50),
	lastname VARCHAR(100),
	curp VARCHAR(20),
	birth_date date,
	gender VARCHAR(20),
	state VARCHAR(50),
	town VARCHAR(50),
	neighborhood VARCHAR(50),
	program VARCHAR(100),
	tags VARCHAR(15),
	emprendedor VARCHAR(20),
	aliado VARCHAR(20)
);

create table mail(
	id INT NOT NULL,
	uuid VARCHAR(100),
	FOREIGN KEY (id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS company(
    company INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    location VARCHAR(50),
    description VARCHAR(50),
    web VARCHAR(50),
    contact VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Event(
    event INT PRIMARY KEY AUTO_INCREMENT,
    company INT,
    capacity VARCHAR(50),
    cost DECIMAL,
    modality VARCHAR(50),
    dateEvent DATETIME,
    location VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS community(
    community INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    description VARCHAR(200)
);
