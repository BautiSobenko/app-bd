import pgClient from 'pg';
import dotenv from 'dotenv';

const {Client} = pgClient;
dotenv.config();

(async () => {

  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: {
      rejectUnauthorized: false
  }
  });

  await client.connect();

  const res = await client.query('select * from empleado');
  console.log(res.rows);

  await client.end();
})();

