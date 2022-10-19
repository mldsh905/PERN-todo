import pkg from 'pg';
const {Pool} = pkg;
import * as dotenv from 'dotenv'
dotenv.config();
const connectionString = process.env.connectionString
const pool = new Pool({
    // user: process.env.user,
    // password: process.env.password,
    // host: process.env.host,
    // post: process.env.port,
    // database: process.env.database
    connectionString
})

export default {
    query: (text, params) => pool.query(text, params),
}