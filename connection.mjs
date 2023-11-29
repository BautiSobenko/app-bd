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


    const nuevoEmpleado = {
        nombre: 'John Doe',
        tipo_doc: 'dni',
        nro_doc: '12345678',
        fecha_nacimiento: '2000-01-01',
        domicilio: 'Calle Principal 123',
        categoría: 'no_profesional',
        password: 'contraseña123',
        huella_dactilar: '111100011111010101011001',
    };

    const empleadoCreado = await crearEmpleado(nuevoEmpleado);
    console.log('Empleado creado:', empleadoCreado);

    // Actualizar el nombre de un empleado
    const empleadoActualizado = await actualizarEmpleado(123, 'John Smith');
    console.log('Empleado actualizado:', empleadoActualizado);

    // Leer todos los empleados
    const empleados = await leerEmpleados();
    console.log('Lista de empleados:', empleados);

    // Eliminar un empleado
    const empleadoEliminado = await eliminarEmpleado(123);
    console.log('Empleado eliminado:', empleadoEliminado);

    client.query("COMMIT");

  } catch (error) {
    console.error('Error en la aplicación:', error.message);
    client.query("ROLLBACK");

  } finally {
    await client.end();
  }
}) ();
  
