-- drop database e_commerce;
create database e_commerce;
use e_commerce;

create table cadastro(
id_user int auto_increment not null,
nome varchar(25) not null,
sobrenome varchar(25) not null,
email varchar(50) not null unique,
senha varchar(25) not null,
telefone varchar(25) not null,
data_criacao date not null,
primary key(id_user)
)engine=InnoDB;

create table endereco(
id_endereco int auto_increment not null,
id_user int not null,
tipo_endereco varchar(25),
cep int not null,
cidade varchar(25),
bairro varchar(25),
rua varchar(25),
primary key(id_endereco),
foreign key(id_user) references cadastro(id_user)
)engine=InnoDB;

create table login(
id_login int auto_increment not null,
email varchar(50) not null,
senha varchar(25) not null,
primary key(id_login),
foreign key(email) references cadastro(email)
)engine=InnoDB;

create table produtos(
id_produtos int auto_increment not null,
nome varchar(300),
categoria ENUM('camera', 'alarme', 'concertina', 'cerca elétrica', 'dvr'),
valor decimal(10,2) not null,
quantidade int not null,
imagem varchar(100),
primary key(id_produtos)
)engine=InnoDB;

use e_commerce;
select * from produtos;
select * from login;

