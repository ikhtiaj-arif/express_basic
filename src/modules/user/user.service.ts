import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, age, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users (name, email, age, password, role) VALUES($1,$2,$3,$4,COALESCE($5,'user')) RETURNING *
        
        `,
    [name, email, age, hashPassword, role],
  );

  delete result.rows[0].password;

  return result;
};

const getUserFromDB = async () => {
  const result = await pool.query(`
            SELECT * FROM users
            `);
  return result;
};

const getUserByIdFromDB = async (id: string) => {
  const result = await pool.query(
    `
            SELECT * FROM users WHERE id=$1
            `,
    [id],
  );
  return result;
};

const updateUserIntoDB = async (id: string, payload: IUser) => {
  const { name, age, password, is_active } = payload;
  const result = await pool.query(
    `
            UPDATE users 
            SET 
            name=COALESCE($1, name), 
            age=COALESCE($2, age), 
            password=COALESCE($3, password), 
            is_active=COALESCE($4, is_active)

            WHERE id=$5 RETURNING *
            `,
    [name, age, password, is_active, id],
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
            DELETE FROM users WHERE id=$1  
            `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getUserFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
