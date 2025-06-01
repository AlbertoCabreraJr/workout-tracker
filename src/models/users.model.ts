import { db } from "../config/db";

export const createUser = async (args: { email: string; password: string }) => {
  const { email, password } = args;
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [email, password];
  const result = await db.query(query, values);
  return result.rows[0];
};

export const getUserByEmail = async (args: { email: string }) => {
  const { email } = args;
  const query = `
    SELECT * FROM USERS
    WHERE email = $1
  `;
  const values = [email];
  const result = await db.query(query, values);
  return result.rows[0];
};

export const getUserById = async (args: { id: string }) => {
  const { id } = args;
  const query = `
    SELECT * FROM USERS
    WHERE user_id = $1
  `;
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
};
