const crearEmpleado = async (empleado) => {
  try {
    const query = `
      INSERT INTO empleado (nro_identificación, nombre, tipo_doc, nro_doc, fecha_nacimiento, domicilio, categoría, password, huella_dactilar)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      empleado.nro_identificación,
      empleado.nombre,
      empleado.tipo_doc,
      empleado.nro_doc,
      empleado.fecha_nacimiento,
      empleado.domicilio,
      empleado.categoría,
      empleado.password,
      empleado.huella_dactilar,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al crear el empleado:', error.message);
    throw error;
  }
};

//! Ver que atributos se podrian actualizar
const actualizarEmpleado = async (nro_identificación, nuevoNombre) => {
  try {
    const query = `
      UPDATE empleado
      SET nombre = $1
      WHERE nro_identificación = $2
      RETURNING *;
    `;

    const values = [nuevoNombre, nro_identificación];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al actualizar el empleado:', error.message);
    throw error;
  }
};

const leerEmpleados = async () => {
  try {
    const query = 'SELECT * FROM empleado;';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al leer los empleados:', error.message);
    throw error;
  }
};

const eliminarEmpleado = async (nro_identificación) => {
  try {
    const query = `
      DELETE FROM empleado
      WHERE nro_identificación = $1
      RETURNING *;
    `;

    const values = [nro_identificación];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error al eliminar el empleado:', error.message);
    throw error;
  }
};

// Uso de las funciones
const main = async () => {
  
    try {
        const nuevoEmpleado = {
            nro_identificación: 123,
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

    } catch (error) {
        console.error('Error en la aplicación:', error.message);
    
    } finally {
        await pool.end();
 }
};

// Ejecutar la aplicación
main();
