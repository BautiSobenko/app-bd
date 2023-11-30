import pgClient from 'pg';
import dotenv from 'dotenv';
import { Empleado } from './crudEmpleados.mjs';

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

    let result;

    result = await client.query("SELECT * FROM obtener_no_profesionales_autorizados();");
    console.log("EMPLEADOS AUTORIZADOS: \n", result.rows);

    // result = await client.query("SELECT * FROM obtener_empleados_con_intentos_fallidos();");
    // console.log("EMPLEADOS AUTORIZADOS: \n", result.rows);

    // result = await client.query("SELECT * FROM vista_sin_ingreso_exitoso_posterior;");
    // console.log("EMPLEADOS AUTORIZADOS: \n", result.rows);

    client.end();

    queryEmpleado(1);
    queryEmpleado(2);

    

  } catch (error) {
    console.error('Error en la aplicación:', error.message);
  }

}) ();
  
const queryEmpleado = async (id) => {

  console.log("COMIENZA LA TRANSACCION CON ID: ",id);

  const empleado = new Empleado();

      try {

        empleado.conectarBD();

        empleado.client.query("START TRANSACTION ISOLATION LEVEL SERIALIZABLE");

        const modificables = {
          nombre: null,
          domicilio: "Jujuy 0000",
          password: null,
        }
      
        let result = await empleado.actualizarEmpleado(182, modificables);
        console.log(id, " EMPLEADO MODIFICADO: ", result.rows[0]);

        empleado.client.query("COMMIT");
        console.log("TERMINA TRANSACCION CON ID: ", id);

      } catch (error) {
          empleado.client.query("ROLLBACK");
          console.log("ROLLBACK DE TRANSACCION CON ID: ", id);
      } 
        


}