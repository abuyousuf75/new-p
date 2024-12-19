import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path: path.join(process.cwd(), '.env')})

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bycript_salt_round: process.env.BYCRIPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};

//C:\Users\GEN-Z\Desktop\first-project