import express from "express";
import e, { RequestHandler } from "express";
import { pool } from "../db";

export const allProducts: RequestHandler = async (req, res, next) => {
  const product_name = req.query.product_name as string;
  const product_category = req.query.product_category as string;

  let sql = `
        SELECT * 
        FROM products
        WHERE 1 = 1
        `;

  const values: any[] = [];
  let count = 1;

  if (product_name) {
    sql += ` AND product_name ILIKE $${count}`;
    values.push(`%${product_name}%`);
    count++;
  }
  if (product_category) {
    sql += ` AND product_category ILIKE $${count}`;
    values.push(`%${product_category}%`);
    count++;
  }
  const result = await pool.query(sql, values);
  res.render("products", {
    products: result.rows,
    filters: {
      product_name,
      product_category,
    },
  });
};

export const addProduct: RequestHandler = async (req, res, next) => {
  const { product_name, product_category } = req.body;

  const result = await pool.query(
    `
        INSERT INTO products (product_name, product_category)
        VALUES ($1, $2)
        RETURNING *
        `,
    [product_name, product_category],
  );

  const addedProduct = result.rows[0];

  res.status(201).json({
    success: true,
    message: "Product added successfully!",
    product: addedProduct,
  });
};
