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

    client.query("BEGIN");

    let result = await client.query("CALL obtener_empleados_autorizados()");
    console.log("EMPLEADOS AUTORIZADOS: " + result.rows);

    result = await client.query("CALL obtener_empleados_con_intentos_fallidos()");
    console.log("EMPLEADOS CON INTENTOS FALLIDOS: " + result.rows);

    const query = 'SELECT * FROM vista_intentos_fallidos;';
    result = await pool.query(query);

    // SITUACION DE COMMIT

    const modificables = {
      nombre: null,
      domicilio: "Lamadrid 2271",
      categoria: null,
      password: null,
    }

    actualizarEmpleado(182, modificables);

    eliminarEmpleado(2);

    // SITUACION DE ROLLBACK

    //! HACER SALTAR EL TRIGGER

    //! SIMULAR ROLLBACK


    client.query("COMMIT");

  } catch (error) {
    console.error('Error en la aplicación:', error.message);
    client.query("ROLLBACK");

  } finally {
    await client.end();
  }
}
)();

