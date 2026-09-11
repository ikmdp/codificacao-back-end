const os = require ('os');


const plataforma = os.platform ();
const memoriaTotal = (os.totalmem()/ (1024 ** 3)).toFixed(2);
const memoriaLivre = (os.freemem()/ (1024 ** 3)).toFixed(2);
const processador = os.cpus();

console.log(`Arquitetura OS: ${plataforma}`);
console.log(`Memória RAM total: ${memoriaTotal} GB`);
console.log(`Memória RAM livre: ${memoriaLivre} GB`);
console.log(`Cores do Processador: ${processador.length}`);
console.log(`Processador: ${processador[0].model}`);
console.log(`Velocidade do Processador: ${processador[0].speed} MHz`);

