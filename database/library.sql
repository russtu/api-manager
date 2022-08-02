DROP DATABASE IF EXISTS manager;
CREATE SCHEMA `manager`;
USE manager;

CREATE TABLE clubs (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  principalBudget INT UNSIGNED NOT NULL,
  budget INT UNSIGNED NOT NULL,
  hasCoach ENUM("true", "false") DEFAULT "false" NOT NULL,
  location VARCHAR(100) NOT NULL
  );

CREATE TABLE players (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  country VARCHAR(100) NOT NULL,
  salary INT UNSIGNED,
  club_id INT UNSIGNED,
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  );

  CREATE TABLE coaches (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (100),
  age INT NOT NULL,
  country VARCHAR(100) NOT NULL,
  salary INT UNSIGNED,
  club_id INT UNSIGNED,
  FOREIGN KEY (club_id) REFERENCES clubs(id)
  );


