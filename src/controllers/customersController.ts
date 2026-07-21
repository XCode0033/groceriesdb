import express from "express";
import e, { RequestHandler } from "express";
import { pool } from "../db";

export const allCustomers: RequestHandler = async (req, res, next) => {
  const customer_name = req.query.customer_name as string;
  const customer_email = req.query.customer_email as string;

  let sql = `
    SELECT * FROM customers
    WHERE 1=1
    `;
  let values: any[] = [];
  let count = 1;

  if (customer_name) {
    sql += ` AND customer_name ILIKE $${count}`;
    values.push(`%${customer_name}%`);
  }
  if (customer_email) {
    sql += ` AND customer_email ILIKE $${count}`;
    values.push(`%${customer_email}%`);
    count++;
  }
  let result = await pool.query(sql, values);
  res.render("customers", {
    customers: result.rows,
    filters: {
      customer_name,
      customer_email,
    },
  });
};
