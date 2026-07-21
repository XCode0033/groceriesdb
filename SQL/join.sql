SELECT 
    p.product_id,
    p.product_name,
    p.product_category,
    sp.price,
    s.store_id,
    s.store_name,
    c.customer_id,
    c.customer_name,
    c.customer_email
FROM products AS p
JOIN store_products AS sp
    ON p.product_id = sp.product_id
JOIN stores AS s
    ON s.store_id = sp.store_id
JOIN orders AS o
    ON o.store_id = s.store_id
JOIN customers AS c
    ON c.customer_id = o.customer_id;