import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../db";

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
    is_active: user.is_active,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtpayload, config.jwtSecret, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(jwtpayload, config.refresh_secret, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
};

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized access!");
  }

  const decoded = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1  
        `,
    [decoded.email],
  );

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User Not Found!");
  }
  if (!user.is_active) {
    throw new Error("Forbidden!");
  }
  //generate token
  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtpayload, config.jwtSecret, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = { loginUserDB, generateRefreshToken };
