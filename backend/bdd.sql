CREATE DATABASE IF NOT EXISTS bancocafeteria;
USE bancocafeteria;

CREATE TABLE IF NOT EXISTS itemsCardapio (
    id serial PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    imagem VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id serial PRIMARY KEY NOT NULL,
    mesa_id serial NOT NULL,
    total DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);


