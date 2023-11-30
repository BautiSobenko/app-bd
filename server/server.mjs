import express, { json } from 'express';
import { Empleado } from "../crudEmpleados.mjs";

const app = express();
const puerto = 3000;

app.use(json());

app.get('/', (req, res) => {

    (async () => {
        let empleado = new Empleado();
        
        try {
            await empleado.conectarBD();
            let empleados = await empleado.mostrarEmpleados();
            res.json(empleados);
        } catch (error) {
            console.log(error);
        }

    }) ();

});


app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${5050}`);
});
