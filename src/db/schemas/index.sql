-- Active: 1665975621102@@127.0.0.1@3306

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL UNIQUE,
    create_at DATE DEFAULT (datetime('now','localtime'))
);

INSERT INTO category (category) 
VALUES ("Mercado"), ("Bar"), ("Lanchonete"), ("Uso Pessoal"), ("Açougue"), ("Padaria");


SELECT * FROM category;

CREATE TABLE IF NOT EXISTS brand (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL UNIQUE,
    create_at DATE DEFAULT (datetime('now','localtime'))
);

INSERT INTO brand (brand) 
VALUES ("Camil"), ("Ambev"), ("Pantene"), ("Fofinho"), ("Solito"), ("União");


SELECT * FROM brand;

CREATE TABLE IF NOT EXISTS weight (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Weight TEXT NOT NULL UNIQUE,
    create_at DATE DEFAULT (datetime('now','localtime'))
);

INSERT INTO weight (weight) 
VALUES ("1kg"), ("500g"), ("250g"), ("100g"), ("1L"), ("600ml"), ("360ml"), ("500ml"), ("5kg");

SELECT * FROM weight;

DELETE FROM products;

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    desc TEXT,
    purchase_price REAL NOT NULL,
    price REAL NOT NULL,


    category_id INTEGER,
    brand_id INTEGER,
    weight_id INTEGER,

    create_at DATE DEFAULT (datetime('now','localtime')),

    Foreign Key (category_id) REFERENCES category(id),
    Foreign Key (brand_id) REFERENCES brand(id),
    Foreign Key (weight_id) REFERENCES weight(id)
);


INSERT INTO products 
(name,desc,purchase_price, price, category_id, brand_id, weight_id) 
VALUES 
("Açucar", "Açucar Refinado", 2.99, 4.20, 1,6,1),
("Arroz", "Arroz Branco T1", 17, 20, 1,1,9),
("Feijão", "Feijão Carioca", 5, 8, 1,1,1); 

SELECT * FROM products;

SELECT p.id, p.name, p.desc, p.purchase_price, p.price, c.category, b.brand, w.Weight, p.create_at
FROM products AS p

INNER JOIN category AS c
ON c.id = p.category_id

INNER JOIN brand AS b
ON b.id = p.brand_id

INNER JOIN weight AS w
ON w.id = p.weight_id;



SELECT p.id, p.name, p.desc, p.purchase_price, p.price, c.category, b.brand, w.Weight, p.create_at
FROM products AS p

INNER JOIN category AS c
ON c.id = p.category_id

INNER JOIN brand AS b
ON b.id = p.brand_id

INNER JOIN weight AS w
ON w.id = p.weight_id
WHERE p.name LIKE 'Ar%'; 


SELECT COUNT(*) FROM products;


CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    product_id INTEGER UNIQUE,
    qtd INTEGER NOT NULL,

    create_at DATE DEFAULT (datetime('now','localtime')),

    Foreign Key (product_id) REFERENCES products(id)
);

/* Entrada do 0*/
INSERT INTO inventory 
(product_id, qtd) 
VALUES 
(1, 20), (2, 5), (3, 10);

/* Incrementar qtd +1*/

UPDATE inventory
SET qtd = qtd + 1
WHERE id=1;


/* decrementar qtd -1*/

UPDATE inventory
SET qtd = qtd -1
WHERE id=1;


SELECT * FROM inventory AS i INNER JOIN products AS p ON i.product_id = p.id;


SELECT i.id, p.name, i.qtd FROM inventory AS i INNER JOIN products AS p ON i.product_id = p.id;


CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    situation TEXT, 
    create_at DATE DEFAULT (datetime('now','localtime'))
);

INSERT INTO client(name, situation) 
VALUES
("Max", "OK"),
("Jayme", "OK"),
("Lesma", "OK");

SELECT * FROM client;

CREATE TABLE IF NOT EXISTS exit_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    inventory_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    qtd INTEGER NOT NULL,
    
    create_at DATE DEFAULT (datetime('now','localtime')),

    Foreign Key (inventory_id) REFERENCES inventory(id),
    Foreign Key (client_id) REFERENCES client(id)
);

INSERT INTO exit_history(inventory_id, client_id, qtd)
VALUES 
(1,1,5),
(2,1,3),
(3,1,1);

DELETE FROM exit_history;

SELECT * FROM exit_history;

SELECT p.name, c.name AS cliente, p.price, e.qtd, (e.qtd * p.price) total
FROM exit_history AS e 

INNER JOIN inventory AS i
ON e.inventory_id = i.id 

INNER JOIN products AS p
ON i.product_id = p.id

INNER JOIN client AS c
ON e.client_id = c.id;

