import { createWriteStream } from 'fs';
import { fakerDE as faker } from '@faker-js/faker';

// Abre un archivo para escribir el script SQL
const file = createWriteStream('datosAccesos2.sql');

//id_nivel tiene que ser el nivel del area y si el usuario de nro_id debe poder acceder

// Escribe la parte inicial del script SQL
file.write("insert into acceso (accion, fecha, hora, nro_identificacion, id_nivel, autorizacion, id_area) values\n");

let accion = ['Acceso','Egreso'];
let hrs,mins,area,nivel;
let autorizacion;
let idEmpleado;

for (let i = 1; i <= 50; i++) {
    area=0;
    idEmpleado=0;
    hrs = Math.round(Math.random()*23);
    if(hrs<10)
        hrs = '0'+hrs;
    mins = Math.round(Math.random()*59);
    if(mins<10)
        mins = '0'+mins;
    while(area === 0)
        area = Math.round(Math.random()*12);
    while(idEmpleado === 0)
        idEmpleado = Math.round(Math.random()*500)
    if (Math.random()<0.8)
        autorizacion = 'True'
    else
        autorizacion = 'False'
    switch(area){
        case 1:
            nivel = 2;
            break;
        case 2:
            nivel = 3;
            break;
        case 3:
            nivel = 2;
            break;
        case 4:
            nivel = 3;
            break;
        case 5:
            nivel = 3;
            break;
        case 6:
            nivel = 3;
            break;
        case 8:
            nivel = 2;
            break;
        case 9:
            nivel = 3;
            break;
        case 10:
            nivel = 2;
            break;
        case 11:
            nivel = 3;
            break;
    }

    file.write(
       // `(${i}, ` +
        `('${faker.helpers.arrayElement(accion)}', ` +
        `'${faker.date.between({from:'2012-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z'}).toISOString().split('T')[0]}', ` + 
        `'${hrs+':'+mins}', ` +
        `'${idEmpleado}', ` +
        `'${nivel}', ` +
        `'${autorizacion}', ` +
        `'${area}')`
    );

    // Agrega coma al final de cada tupla, excepto la última
    if (i < 50) {
        file.write(",\n");
    } else {
        file.write(";\n");
    }
}