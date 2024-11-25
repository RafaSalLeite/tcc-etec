drop database if exists e_commerce;
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
tipo_endereco ENUM('residencial', 'comercial'),
cep varchar(10) not null,
cidade varchar(25),
bairro varchar(25),
rua varchar(25),
numero int,
primary key(id_endereco),
foreign key(id_user) references cadastro(id_user)
)engine=InnoDB;

create table login(
id_login int auto_increment not null,
email varchar(50) not null,
senha varchar(25) not null,
primary key(id_login)
)engine=InnoDB;

create table produtos(
id_produtos int auto_increment not null,
nome varchar(300),
descricao VARCHAR(500) DEFAULT 'A descrição não está disponível no momento',
categoria ENUM('camera', 'alarme', 'concertina', 'cerca elétrica', 'dvr'),
valor decimal(10,2) not null,
quantidade int not null,
imagem varchar(100),
primary key(id_produtos)
)engine=InnoDB;

create table carrinho(
id_carrinho int auto_increment,
id_user int,
id_produtos int,
quantidade int,
primary key(id_carrinho),
foreign key(id_user) references cadastro (id_user),
foreign key(id_produtos) references produtos (id_produtos)
)engine=InnoDB;

create table pedidos(
id_pedidos int auto_increment,
id_user int,
data_pedido datetime,
total decimal(10,2),
status varchar(20),
primary key(id_pedidos),
foreign key (id_user) references cadastro(id_user)
)engine=InnoDB;

select * from cadastro;
select * from login;

insert into cadastro (nome, sobrenome, email, senha, telefone, data_criacao)
values ('rafaela', 'salvajoli', 'rafa.sa.leite@gmail.com', '123456', '14998366484', '2024-11-12');

insert into login (email, senha) 
values ('rafa.sa.leite@gmail.com', '123456');