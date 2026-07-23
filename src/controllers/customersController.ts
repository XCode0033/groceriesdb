import express from "express";
import { RequestHandler } from "express";
import { pool } from "../db";

export const allCustomers: RequestHandler = async (req, res, next) => {
  const {
    customer_id,
    customer_name,
    customer_email,
    sortBy = "customer_id",
    sortDir = "asc",
  } = req.query as {
    customer_id?: string;
    customer_name?: string;
    customer_email?: string;
    sortBy?: string;
    sortDir?: string;
  };

  let sql = `
    SELECT * FROM customers
    WHERE 1=1
    `;
  let values: any[] = [];
  let count = 1;

  if (customer_id) {
    sql += ` AND customer_id = $${count}`;
    values.push(String(customer_id));
    count++;
  }
  if (customer_name) {
    sql += ` AND customer_name ILIKE $${count}`;
    values.push(`%${customer_name}%`);
  }
  if (customer_email) {
    sql += ` AND customer_email ILIKE $${count}`;
    values.push(`%${customer_email}%`);
    count++;
  }

  const initialAllowedFields = [
    "customer_id",
    "customer_name",
    "customer_email",
  ];
  const finalSortBy = initialAllowedFields.includes(String(sortBy))
    ? String(sortBy)
    : "customer_id";

  const finalSortDir = String(sortDir).toLowerCase() === "asc" ? "ASC" : "DESC";

  sql += ` ORDER BY ${finalSortBy} ${finalSortDir}`;
  let result = await pool.query(sql, values);
  res.render("customers", {
    customers: result.rows,
    filters: {
      customer_id,
      customer_name,
      customer_email,
      sortBy: "customer_id",
      sortDir: "desc",
    },
  });
};

export const createCustomer: RequestHandler = async (req, res, next) => {
  const { customer_name, customer_email } = req.body;

  const result = await pool.query(
    `
  INSERT INTO customers(customer_name, customer_email)
  VALUES($1, $2)
  RETURNING *
  `,
    [customer_name, customer_email],
  );
  const createdCustomer = result.rows[0];

  res.status(201).json({
    newCustomer: createdCustomer,
    message: "Customer created successfully",
  });
};
