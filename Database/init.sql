CREATE DATABASE IF NOT EXISTS `dendenmushi` COLLATE 'utf8_general_ci';
GRANT ALL ON `dendenmushi`.* TO 'root'@'%';

USE dendenmushi

CREATE TABLE IF NOT EXISTS user
(
	id int unsigned not null AUTO_INCREMENT,
	email varchar(255) not null,
	pswd varchar(255) not null,
	primary key (id)
);
INSERT INTO user
(
	id, email, pswd
)
values
(
	1,
	'joao.a@aln.senaicimatec.edu.br',
	'C1M4T3C2020'
);

CREATE TABLE IF NOT EXISTS emails
(
	id int unsigned not null AUTO_INCREMENT,
	recipient varchar(255) not null,
	about varchar(255) null,
	body varchar(255) null,
	user_id int unsigned not null,
	primary key (id)
);