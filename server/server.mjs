import express, { json } from 'express';
import { Empleado } from "../crudEmpleados.mjs";
import cors from 'cors';
import bodyParser from 'body-parser';
import { fakerDE as faker } from '@faker-js/faker';

const app = express();
const puerto = 4000;

app.use(json());
app.use(cors());
app.use(bodyParser.json())

app.get('/', async (req, res) => {

    const empleado = new Empleado();
    
    try {
        await empleado.conectarBD();
        let empleados = await empleado.mostrarEmpleados();
        res.json(empleados);
    } catch (error) {
        console.log(error);
    }

});

app.post('/', async (req, res) => {

    const { nombre,
            domicilio,
            tipo_doc,
            nro_doc,
            fecha_nacimiento,
            password,
            categoria} = req.body;

    const nuevoEmpleado = {
        nombre,
        domicilio,
        tipo_doc,
        nro_doc,
        fecha_nacimiento,
        password,
        categoria,
        huella_dactilar: `${faker.number.binary({ min: 0, max: 1000000 })}`,
    }

    console.log(nuevoEmpleado);

    const empleado = new Empleado();
    
    try {
        await empleado.conectarBD();
        let empleados = await empleado.agregarEmpleado(nuevoEmpleado);
        res.json(empleados);
    } catch (error) {
        console.log(error);
    }

})


app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});
