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
            await this.client.connect();
            console.log('Conectado con exito a la base de datos')
        }
        catch(e){
            console.log(e);
            console.log('Error en la conexion a la base de datos')
        }
    }


    async agregarEmpleado(empleado){

        const query = `
        INSERT INTO empleado (nombre, tipo_doc, nro_doc, fecha_nacimiento, domicilio, categoria, password, huella_dactilar)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `;

        const values = [
            empleado.nombre,
            empleado.tipo_doc,
            empleado.nro_doc,
            empleado.fecha_nacimiento,
            empleado.domicilio,
            empleado.categoria,
            empleado.password,
            empleado.huella_dactilar,
        ];

        try{
            return (await this.client.query(query, values)).rows;
        }
        catch(error){
            console.log(error);
            console.log('no se pudo agregar el empleado')
        }

    }

    async actualizarEmpleado(nro_identificacion, modificables) {
      try {
      
        let query = "UPDATE empleado SET";
    
        const claves = Object.keys(modificables);

        claves.forEach( key => {
            if( modificables[key] !== null ) {
              query += ` ${key} = '${modificables[key]}'`;
            }
        })

        
        query += "WHERE nro_identificacion = $1 RETURNING *;";
        
        console.log(query);

        const values = [nro_identificacion];
    
        const result = await this.client.query(query, values);
        return result.rows[0];
    
      } catch (error) {
        console.error('Error al actualizar el empleado:', error.message);
        throw error;
      }
    };

    async mostrarEmpleados(){
        const query = `
        SELECT * FROM empleado "
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ORDER BY nro_identificacion DESC
        LIMIT 4
        RETURNING *;
        `;

        try{
            return (await client.query(query, values)).rows;
        }
        catch(error){
            console.log('no se pudieron mostrar los empleados')
        }
    }

    async leerEmpleados() {
        try {
          const query = 'SELECT * FROM empleado;';
          const result = await client.query(query);
          return result.rows;
        } catch (error) {
          console.error('Error al leer los empleados:', error.message);
          throw error;
        }
      };
      
      async eliminarEmpleado(nro_identificacion) {
        try {
          const query = `
            DELETE FROM empleado
            WHERE nro_identificacion = $1
            RETURNING *;
          `;
      
          const values = [nro_identificacion];
      
          const result = await this.client.query(query, values);
          return result.rows[0];
        } catch (error) {
          console.error('Error al eliminar el empleado:', error.message);
          throw error;
        }
      };

      async cerrarConexion() {
        this.client.end();
      }
    
}

export {
    Empleado
}

