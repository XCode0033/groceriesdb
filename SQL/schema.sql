-- Run manually: psql -U xavier -h 127.0.0.1 -d groceriesdb -f SQL/schema.sql

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS store_products;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS stores;
DROP TABLE IF EXISTS customers;

CREATE TABLE stores (
  store_id SERIAL PRIMARY KEY,
  store_name VARCHAR(100) NOT NULL,
  store_location VARCHAR(150) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  product_category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- junction table: which products a store carries, and at what price/stock
CREATE TABLE store_products (
  store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (store_id, product_id)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
  store_id INTEGER NOT NULL REFERENCES stores(store_id) ON DELETE CASCADE,
  order_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- junction table: line items belonging to an order
CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  order_items_id SERIAL PRIMARY KEY ,
  UNIQUE (order_id, product_id)
);


