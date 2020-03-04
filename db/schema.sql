DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;
USE users_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email_name VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id)
);