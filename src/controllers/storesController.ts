import express from "express";
import e, { RequestHandler } from "express";
import { pool } from "../db";

export const allStores: RequestHandler = async (req, res, next) => {
  const { store_name, store_location, sortBy, sortDir } = req.query as {
    store_name?: string;
    store_location?: string;
    sortBy?: string;
    sortDir?: string;
  };

  let sql = `
    SELECT * FROM stores
    WHERE 1=1
    `;

  let values: any[] = [];
  let count = 1;

  if (store_name) {
    sql += ` AND store_name ILIKE $${count}`;
    values.push(`%${store_name}%`);
    count++;
  }

  if (store_location) {
    sql += ` AND store_location ILIKE $${count}`;
    values.push(`%${store_location}%`);
    count++;
  }

  let result = await pool.query(sql, values);
  res.render("stores", {
    stores: result.rows,
    filters: {
      store_name,
      store_location,
    },
  });
};
