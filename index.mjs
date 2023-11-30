const cargarTabla = async () => {
    
    let cuerpoTabla = document.getElementById('cuerpo'); 
    
    if (cuerpoTabla) {
        cuerpoTabla.innerHTML = '';
    } else {
        cuerpoTabla = document.createElement('tbody');
        cuerpoTabla.id = 'cuerpo';
    }

    let empleados = await mostrarEmpleados();


    //const empleadoEliminado = await empleado.eliminarEmpleado(513);
    //console.log('Empleado eliminado:', empleadoEliminado);

    let tableContent = '';

    empleados.forEach(( empleado ) => {
        const fila = `
            <tr>
                <td>${empleado.nro_identificacion}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.fecha_nacimiento}</td>
                <td>${empleado.domicilio}</td>
                <td>${empleado.categoria}</td>
            </tr>`;

        tableContent += fila;
    })

    cuerpoTabla.innerHTML = tableContent;
};

const mostrarEmpleados = async () => {

    let url = "http://localhost:4000";

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
        console.log(error)
        console.log("GET Request fallida");
    }

}

const crearEmpleado = async () => {

    let nombre = document.getElementById("nombre").value;
    let domicilio = document.getElementById("domicilio").value;
    let tipo_doc = document.getElementById("tipo-documento").value;
    let nro_doc = document.getElementById("documento").value;
    let fecha_nacimiento = document.getElementById("fecha-nacimiento").value;
    let password = document.getElementById("password").value;
    let categoria = document.getElementById("tipoEmpleado").value;

    const empleado = {
        nombre,
        domicilio,
        tipo_doc,
        nro_doc,
        fecha_nacimiento,
        password,
        categoria   
    };
    
    const url = 'http://localhost:4000'; // Ajusta la ruta según tu configuración
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        });

        if (!response.ok) {
            throw new Error(`La solicitud falló con código de estado ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);

    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }

}

const btn = document.getElementById("agregar-empleado");

btn.addEventListener("click", crearEmpleado)

cargarTabla()