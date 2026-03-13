
import mysql from 'mysql2/promise';
import fs from 'fs';

const {
  DB_HOST = 'db',
  DB_PORT = '3306',
  DB_NAME = 'appdb',
  DB_USER = 'appuser',
  DB_PASSWORD, // optional if using secrets file
  DB_PASSWORD_FILE = '/run/secrets/db_password'
} = process.env;

const password = DB_PASSWORD ?? (fs.existsSync(DB_PASSWORD_FILE) ? fs.readFileSync(DB_PASSWORD_FILE, 'utf8').trim() : '');

export const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function healthCheck() {
  const [rows] = await pool.query('SELECT 1 AS ok');
  return rows[0]?.ok === 1;
}
