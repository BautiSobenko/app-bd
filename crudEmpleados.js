import pgClient from 'pg';
import dotenv from 'dotenv';

const {Client} = pgClient;
dotenv.config();

class Empleado{

    constructor(){
        this.client = new Client({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: {
          rejectUnauthorized: false
        }
      });
    }

    async conectarBD(){
        try{
            await client.connect();
            console.log('se conecto a la bd')
        }
        catch(e){
            console.log('no se pudo conectar')
        }
    }


    async agregarEmpleado(empleado){

        const query = `
        INSERT INTO empleado (nro_identificación, nombre, tipo_doc, nro_doc, fecha_nacimiento, domicilio, categoría, password, huella_dactilar)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `;

        const values = [
            empleado.nombre,
            empleado.tipo_doc,
            empleado.nro_doc,
            empleado.fecha_nacimiento,
            empleado.domicilio,
            empleado.categoría,
            empleado.password,
            empleado.huella_dactilar,
        ];

        try{
            const result = await pool.query(query, values);
        }
        catch(error){
            console.log('no se pudo agregar el empleado')
        }

    }

    modificarEmpleado(Empleado , atributo){
        const query = `
        UPDATE INTO empleado (nro_identificación, nombre, tipo_doc, nro_doc, fecha_nacimiento, domicilio, categoría, password, huella_dactilar)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `;

        const values = [
            empleado.nombre,
            empleado.tipo_doc,
            empleado.nro_doc,
            empleado.fecha_nacimiento,
            empleado.domicilio,
            empleado.categoría,
            empleado.password,
            empleado.huella_dactilar,
        ];

        try{
            const result = await pool.query(query, values);
        }
        catch(error){
            console.log('no se pudo modificar el empleado')
        }
    }

    mostrarEmpleados(){
        const query = `
        SELECT * FROM empleado "
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `;

        try{
            const result = await pool.query(query, values);
        }
        catch(error){
            console.log('no se pudieron mostrar los empleados')
        }
    }
    
}

