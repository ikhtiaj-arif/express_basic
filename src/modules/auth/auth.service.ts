import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  // 1. check user exists orr not
  // 2. compare the password
  // 3. generate token

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }
  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);
  console.log(matchPassword);
  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  //generate token
  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtpayload, config.jwtSecret, {
    expiresIn: "1d",
  });
  return {accessToken} 
};

export const authService = { loginUserDB };
