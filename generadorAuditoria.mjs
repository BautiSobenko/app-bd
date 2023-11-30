import { createWriteStream } from 'fs';
import { fakerDE as faker } from '@faker-js/faker';

// Abre un archivo para escribir el script SQL
const file = createWriteStream('datosAuditorias.sql');

file.write("insert into acceso (id_contrato, nro_auditoria, resultado,fecha,hora) values\n");
let contrato,resultado,hrs,mins,rd;

for (let i = 1; i <= 50; i++) {
    contrato=0;
    hrs = Math.round(Math.random()*23);
    if(hrs<10)
        hrs = '0'+hrs;
    mins = Math.round(Math.random()*59);
    if(mins<10)
        mins = '0'+mins;
    while(contrato === 0)
        contrato = Math.round(Math.random()*200);
    rd = Math.random();
    if (rd<0.6)
        resultado = 'exitoso';
    else if (rd<0.8)
        resultado = 'parcialmente exitoso';
    else
        resultado = 'insatisfactorio';

    file.write(
        `(${contrato}, ` +
        `'${i}', ` +
        `'${resultado}', ` +
        `'${faker.date.between({from:'2018-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z'}).toISOString().split('T')[0]}', ` + 
        `'${hrs+':'+mins}') `
    );

    // Agrega coma al final de cada tupla, excepto la última
    if (i < 50) {
        file.write(",\n");
    } else {
        file.write(";\n");
    }
}