//import { name, random, date, address, internet } from 'faker';
import { createWriteStream } from 'fs';
import { fakerDE as faker } from '@faker-js/faker';

// Abre un archivo para escribir el script SQL
const file = createWriteStream('datosEmpleado.sql');

// Escribe la parte inicial del script SQL
file.write("insert into empleado (nombre, tipo_doc, nro_doc, fecha_nacimiento, domicilio, categoría, password, huella_dactilar) values\n");
let nombre;
let direccion;

let nombres = ['Mateo', 'Sofía', 'Valentina', 'Santiago', 'Benjamín', 'Mia', 'Emilia', 'Mateo', 'Isabella', 'Sebastián', 'Agustín', 'Victoria', 'Joaquín',
 'Emma', 'Lucas', 'Olivia', 'Martín', 'Delfina', 'Tomás', 'Luna', 'Juan', 'Catalina', 'Facundo', 'Sara', 'Francisco', 'Valentín', 'Camila', 'Nicolás', 'Renata',
'Lautaro', 'Catalina', 'Bautista', 'Guadalupe', 'Facundo', 'Mila', 'Alejandro', 'Juana', 'Tobías', 'Aurora', 'Julián', 'Isabel',
 'Ignacio', 'Valeria', 'Ramiro', 'Florencia', 'Matías', 'Candelaria'];
let apellidos = ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez', 'Pérez', 'García', 'Sánchez', 'Romero', 'Suárez', 'Torres', 'Álvarez', 'Ramírez', 'Flores', 'Benítez',
 'Acosta', 'Giménez', 'Mendoza', 'Ruiz', 'Cabrera', 'Rojas', 'Ortiz', 'Medina', 'Castro', 'Vega', 'Juárez',
  'Molina', 'Silva', 'Ramos', 'Sosa', 'Ferrer', 'Blanco', 'Castillo', 'Luna', 'Olivares', 'Navarro', 'Fuentes',
   'Cruz', 'Ibarra', 'Ríos', 'Miranda', 'Cáceres', 'Moreno', 'Delgado', 'Peralta', 'Vargas'];
let calles = ['Avenida de Mayo', 'Corrientes', '9 de Julio', 'Florida', 'Sarmiento', 'Santa Fe', 'Callao', 'Lavalle', 'Reconquista',
 'Alsina', 'Tucumán', 'Paraguay', 'Lima', 'Perón', 'Cerrito', 'Maipú', 'Viamonte', 'Paraná', 'San Martín', 'Hipólito Yrigoyen', 'Montevideo',
  'Avellaneda', 'San José', 'Pellegrini', 'Diagonal Norte', 'Suipacha', 'Monserrat', 'Av. Presidente Roque Sáenz Peña', 'Esmeralda', 'San Juan',
   'Avenida Alvear', 'Avenida Libertador', 'Córdoba', 'Carlos Pellegrini', 'Avenida Rivadavia', 'Santa Rosa', 'Güemes', 'Avenida Paseo Colón',
    'Sáenz', 'Tacuarí', 'San Luis', 'Parque Lezama', 'Balcarce', 'Piedras', 'Santiago del Estero', 'Avenida Scalabrini Ortiz', 'Medrano'];
let rangos = ['profesional','noProfesional','jerarquico'];
let rg;
let cantJerarquicos = 0;

// Genera 500 tuplas
for (let i = 1; i <= 512; i++) {
    nombre = faker.helpers.arrayElement(nombres) + ' ' + faker.helpers.arrayElement(apellidos);
    direccion = faker.helpers.arrayElement(calles) + ' ' + faker.number.int({min:0, max:9999}); 
    rg = faker.helpers.arrayElement(rangos);
    if(rg === 'jerarquico'){
        if(cantJerarquicos<12)
            cantJerarquicos++;
        else
            while(rg === 'jerarquico')
                rg = faker.helpers.arrayElement(rangos);
    }

    file.write(
        //`(${i}, ` +
        `('${nombre}', ` +
        `'dni', ` +
        `'${faker.number.bigInt({ min: 10000000, max: 43999999 })}', ` +
        `'${faker.date.between({from:'1950-01-01T00:00:00.000Z', to: '2001-01-01T00:00:00.000Z'}).toISOString().split('T')[0]}', ` + 
        `'${direccion}', ` +
        `'${rg}', ` +
        `'${faker.internet.password()}', ` +
        `x'${faker.number.binary({ min: 0, max: 1000000 })}')`
    );

    // Agrega coma al final de cada tupla, excepto la última
    if (i < 512) {
        file.write(",\n");
    } else {
        file.write(";\n");
    }
}

// Cierra el archivo
file.end();