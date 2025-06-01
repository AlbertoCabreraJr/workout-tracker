import { db } from "../config/db";
import { CreateUser, User } from "../types";

export class UserModel {
  async createUser(args: CreateUser): Promise<User> {
    const { email, password } = args;
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async getUserByEmail(args: { email: string }) {
    const { email } = args;
    const query = `
      SELECT * FROM USERS
      WHERE email = $1
    `;
    const values = [email];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async getUserById(args: { id: string }) {
    const { id } = args;
    const query = `
      SELECT * FROM USERS
      WHERE user_id = $1
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  }
}
