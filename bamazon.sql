DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(300) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Levi's 501 Jeans", "Apparel", 98.00, 100), 
("Birkenstocks", "Apparel", 50.00, 100),
("Floral Dress", "Apparel", 65.00, 50), 
("MacBook Air", "Electronics", 1000.00, 100),
("Balexa", "Electronics", 90.00, 50),
("Lamp", "Home Decor", 50.00, 75),
("5x7 Rug", "Home Decor", 325.00, 50),
("4x6 Picture Frame", "Home Decor", 25.00, 100),
("Yoga Mat", "Athletics", 50.00, 50),
("Yoga Block", "Athletics", 30.00, 100);

SELECT * FROM products






