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

  try {
    
    await client.connect();
    result = await client.query(`Select * from empleado where categoria = 'jerarquico'`);
    console.log(result.rows);
  } catch (error) {
    console.error('Error en la aplicación:', error.message);
    client.query("ROLLBACK");

  } finally {
    await client.end();
  }
}
)();

