import express from "express";
import e, { RequestHandler } from "express";
import { pool } from "../db";

export const allProducts: RequestHandler = async (req, res, next) => {
  const {
    product_id,
    product_name,
    product_category,
    sortBy = "product_id",
    sortDir = "desc",
  } = req.query as {
    product_id?: string;
    product_name?: string;
    product_category?: string;
    sortBy?: string;
    sortDir?: string;
  };

  let sql = `
        SELECT * 
        FROM products
        WHERE 1 = 1
        `;

  const values: any[] = [];
  let count = 1;

  if (product_id) {
    sql += ` AND product_id = $${count}`;
    values.push(String(product_id));
    count++;
  }
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

  const allowedSortFields = ["product_id", "product_name", "product_category"];
  const finalSortBy = allowedSortFields.includes(String(sortBy))
    ? String(sortBy)
    : "product_id";

  const finalSortDir = String(sortDir).toLowerCase() === "asc" ? "ASC" : "DESC";

  sql += ` ORDER BY ${finalSortBy} ${finalSortDir}`;
  const result = await pool.query(sql, values);
  res.render("products", {
    products: result.rows,
    filters: {
      product_id,
      product_name,
      product_category,
      sortBy: finalSortBy,
      sortDir: finalSortDir.toLowerCase(),
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
