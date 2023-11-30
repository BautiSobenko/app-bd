import { createWriteStream } from 'fs';
import { fakerDE as faker } from '@faker-js/faker';

// Abre un archivo para escribir el script SQL
const file = createWriteStream('datosPosee.sql');

let contratados = [1, 2, 4, 8, 10, 23, 25, 28, 30, 34, 46, 56, 61, 66, 67, 72, 74, 89, 93, 95, 103, 106, 108, 111, 112, 117, 120,
     131, 135, 137, 139, 143, 145, 146, 147, 150, 168, 169, 172, 173, 174, 175, 177, 179, 180, 183, 189, 197, 198, 199, 201, 209,
      210, 220, 225, 227, 228, 237, 238, 239, 245, 259, 265, 268, 270, 276, 277, 282, 284, 287, 289, 293, 302, 306, 308, 309, 312,
       334, 341, 342, 345, 346, 355, 357, 358, 359, 360, 361, 364, 375, 378, 379, 383, 385, 387, 388, 391, 394, 401, 409, 415, 416,
        418, 424, 428, 429, 437, 438, 439, 443, 445, 449, 454, 457, 459, 463, 474, 477, 479, 483, 490, 495, 497, 499, 503, 504, 505, 508, 509, 510]

// Escribe la parte inicial del script SQL
file.write("insert into acceso (id_area, id_contrato, nro_identificacion) values\n");
let area;
let j;
j = 0;
for (let i = 1; i <= 200; i++) {
    if(j == 124)
        j = 0;
    area = 0
    while(area === 0)
        area = Math.round(Math.random()*12);

    
    file.write(
        `(${area}, ` +
        `'${i}', ` +
        `'${contratados[j]}')`
    );
    j++;
    // Agrega coma al final de cada tupla, excepto la última
    if (i < 200) {
        file.write(",\n");
    } else {
        file.write(";\n");
    }
}