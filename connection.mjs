import { Empleado } from './crudEmpleados.mjs';

(async () => {
  
  const empleado = new Empleado();

  try {

    await empleado.conectarBD();

    const nuevoEmpleado = {
        nombre: 'John Quilis',
        tipo_doc: 'dni',
        nro_doc: '15453135',
        fecha_nacimiento: '2000-01-01',
        domicilio: 'Calle Principal 123',
        categoria: 'noProfesional',
        password: 'contraseña123',
        huella_dactilar: '11110001111101010111011010111101110011',
    };

    //const empleadoCreado = await empleado.agregarEmpleado(nuevoEmpleado);
    //console.log('Empleado creado:', empleadoCreado);
    
    //const empleadoEliminado = await empleado.eliminarEmpleado(513);
    //console.log('Empleado eliminado:', empleadoEliminado);

    const modificables = {
      nombre: null,
      domicilio: null,
      password: null,
    }

    //const empleadoModificado = await empleado.actualizarEmpleado(500, modificables);
    //console.log('Empleado modificado:', empleadoModificado);

  } catch (error) {
    console.error('Error en la aplicación:', error.message);

  } finally {
    await empleado.cerrarConexion();
  }
}) ();
  
