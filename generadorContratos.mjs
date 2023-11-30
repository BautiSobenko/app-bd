import { createWriteStream } from 'fs';
import { fakerDE as faker } from '@faker-js/faker';

// Abre un archivo para escribir el script SQL
const file = createWriteStream('datosContratos.sql');

//id_nivel tiene que ser el nivel del area y si el usuario de nro_id debe poder acceder

// Escribe la parte inicial del script SQL
file.write("insert into acceso (id_tarea, periodo) values\n");
let tarea, mesInicio, anioInicio, mesFinal, anioFinal, periodo;
// Genera 500 tuplas
for (let i = 1; i <= 200; i++) {
    tarea = 0;
    while(tarea === 0)
        tarea = Math.round(Math.random()*30);

    anioInicio = faker.number.int({min:2018, max:2023});
    mesInicio = faker.number.int({min:1, max:12});
    anioFinal = Math.round(Math.random() * (2024 - 2018) + 2018);
    mesFinal = faker.number.int({min:1, max:12});

    while(anioInicio>anioFinal || (anioInicio === anioFinal && mesInicio>mesFinal) || (anioInicio == anioFinal && mesInicio == mesFinal)){
        //console.log(mesInicio+'/'+anioInicio+'-'+mesFinal+'/'+anioFinal);
        anioFinal = Math.round(Math.random() * (2024 - 2018) + 2018);
        mesFinal = faker.number.int({min:1, max:12});
    }
    if(mesInicio<10)
        mesInicio = '0'+mesInicio;
    if(mesFinal<10)
        mesFinal = '0'+mesFinal;
    periodo = mesInicio+'/'+anioInicio+'-'+mesFinal+'/'+anioFinal;
    
    file.write(
        //`(${i}, ` +
        `('${tarea}', ` +
        `'${periodo}')`
    );

    // Agrega coma al final de cada tupla, excepto la última
    if (i < 200) {
        file.write(",\n");
    } else {
        file.write(";\n");
    }
}