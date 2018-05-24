import pg from 'pg';
import config from '../config/config';

const { Pool } = pg;
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : '';
const databaseConfig = config[process.env.NODE_ENV || 'development'];
const pool = new Pool(databaseConfig);

export default pool;
