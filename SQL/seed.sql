-- Run manually after schema.sql: psql -U xavier -h 127.0.0.1 -d groceriesdb -f SQL/seed.sql

INSERT INTO stores (store_name, store_location) VALUES
  ('Green Valley Market', '12 Orchard St, Springfield'),
  ('Fresh Corner Grocery', '48 Elm Ave, Rivertown'),
  ('Sunrise Foods', '900 Maple Blvd, Lakeside'),
  ('Downtown Pantry', '215 Main St, Brookhaven'),
  ('Harvest Basket', '77 Pine Rd, Fairview');

INSERT INTO products (product_name, product_category) VALUES
  ('Bananas', 'Produce'),
  ('Apples', 'Produce'),
  ('Carrots', 'Produce'),
  ('Whole Milk', 'Dairy'),
  ('Cheddar Cheese', 'Dairy'),
  ('Eggs (dozen)', 'Dairy'),
  ('Sourdough Bread', 'Bakery'),
  ('Bagels', 'Bakery'),
  ('Chicken Breast', 'Meat'),
  ('Ground Beef', 'Meat'),
  ('Black Beans (can)', 'Pantry'),
  ('Pasta', 'Pantry'),
  ('Olive Oil', 'Pantry'),
  ('Orange Juice', 'Beverages'),
  ('Coffee Beans', 'Beverages');

INSERT INTO customers (customer_name, customer_email) VALUES
  ('Alice Rivera', 'alice.rivera@example.com'),
  ('Ben Turner', 'ben.turner@example.com'),
  ('Chloe Kim', 'chloe.kim@example.com'),
  ('David Ortiz', 'david.ortiz@example.com');

-- store_products: which products each store carries, price + stock
INSERT INTO store_products (store_id, product_id, price, stock_quantity) VALUES
  (1, 1, 0.59, 120), (1, 2, 1.29, 80), (1, 4, 3.49, 40), (1, 7, 4.99, 25), (1, 9, 6.99, 30),
  (2, 1, 0.55, 100), (2, 3, 1.10, 60), (2, 5, 5.49, 20), (2, 8, 3.99, 35), (2, 11, 1.29, 50),
  (3, 2, 1.19, 70), (3, 6, 3.29, 45), (3, 10, 7.49, 25), (3, 12, 2.19, 60), (3, 14, 4.29, 30),
  (4, 4, 3.59, 38), (4, 7, 5.29, 20), (4, 9, 7.29, 28), (4, 13, 8.99, 15), (4, 15, 9.99, 22),
  (5, 1, 0.62, 90), (5, 3, 1.05, 55), (5, 6, 3.19, 40), (5, 11, 1.35, 48), (5, 14, 4.49, 27);

-- orders placed by customers at stores
INSERT INTO orders (customer_id, store_id, order_date) VALUES
  (1, 1, NOW() - INTERVAL '5 days'),
  (2, 1, NOW() - INTERVAL '3 days'),
  (3, 2, NOW() - INTERVAL '4 days'),
  (4, 3, NOW() - INTERVAL '2 days'),
  (1, 4, NOW() - INTERVAL '1 day'),
  (2, 5, NOW());

-- order_items: line items for each order
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 6, 0.59), (1, 4, 2, 3.49), (1, 7, 1, 4.99),
  (2, 2, 3, 1.29), (2, 9, 2, 6.99),
  (3, 1, 4, 0.55), (3, 5, 1, 5.49), (3, 11, 3, 1.29),
  (4, 6, 2, 3.29), (4, 10, 1, 7.49),
  (5, 4, 1, 3.59), (5, 13, 1, 8.99), (5, 15, 1, 9.99),
  (6, 1, 5, 0.62), (6, 14, 2, 4.49);
