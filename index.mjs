const cargarTabla = async () => {
    
    let cuerpoTabla = document.getElementById('cuerpo'); 

    let empleados = await mostrarEmpleados();

    /*
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
    */

    //const empleadoCreado = await empleado.agregarEmpleado(nuevoEmpleado);
    //console.log('Empleado creado:', empleadoCreado);
    
    //const empleadoEliminado = await empleado.eliminarEmpleado(513);
    //console.log('Empleado eliminado:', empleadoEliminado);

    
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

const mostrarEmpleados = async () => {

    let url = "http://localhost:5050/";

    let options = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    }

    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.log("GET Request fallida");
    }

}

cargarTabla()