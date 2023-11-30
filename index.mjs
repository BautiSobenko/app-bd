import { Empleado } from "./crudEmpleados.mjs";

const cargarTabla = async () => {
    let cuerpoTabla = document.getElementById('cuerpo'); 


    // let empleado = new Empleado()

    // await empleado.conectarBD();

    const empleados = [{
        nombre: 'John Quilis',
        tipo_doc: 'dni',
        nro_doc: '15453135',
        fecha_nacimiento: '2000-01-01',
        domicilio: 'Calle Principal 123',
        categoria: 'noProfesional',
        password: 'contraseña123',
        huella_dactilar: '11110001111101010111011010111101110011'}
    ]

    //const empleadoCreado = await empleado.agregarEmpleado(nuevoEmpleado);
    //console.log('Empleado creado:', empleadoCreado);
    
    //const empleadoEliminado = await empleado.eliminarEmpleado(513);
    //console.log('Empleado eliminado:', empleadoEliminado);

    // let empleados = empleado.mostrarEmpleados()
    let tableContent = '';



    empleados.forEach(( empleado ) => {
        const fila = `
            <tr>
                <td>${empleado.id}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.pisos}</td>
                <td>${empleado.estado}</td>
            </tr>`;

        tableContent += fila;
    })

    cuerpoTabla.innerHTML = tableContent;
};

cargarTabla()