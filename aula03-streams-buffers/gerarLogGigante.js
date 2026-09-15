import fs from 'fs';

const data = new Date().toDateString().split('T')[0];
const hora = new Date().toLocaleTimeString();

const streamEscrita = fs.createWriteStream('servidor.log');
console.log('Gerando Arquivo de Log simulado...');

for(let i =0; i<400000; i++){
    const tipo = i % 7 === 0 ? 'ERROR' : 'INFO';
    streamEscrita.write(`[${data} - ${hora}] Linha ${i}: Status 200
        - Mensagem de teste ${tipo} \n`); 
}
streamEscrita.end();