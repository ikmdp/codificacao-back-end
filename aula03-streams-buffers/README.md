15/09/2026
Aula 03 - Streams e Buffers

Processamento de arquivos de log grandes utilizando Streams do Node.js, lendo o conteúdo linha a linha sem carregar o arquivo inteiro em memória.

📌 Objetivo

Ler um arquivo de log (servidor.log), identificar as linhas que contêm erros e salvá-las em um novo arquivo (apenas_erros.log), monitorando o consumo de memória durante o processo.

⚙️ Funcionamento
O arquivo de log é lido através de um Read Stream;
O readline percorre o stream linha a linha, de forma assíncrona (for await...of);
Cada linha é verificada: se contiver ERROR, é escrita em um Write Stream de saída e contabilizada;
O consumo de memória (RSS e Heap) é exibido no início e no fim do processamento;
Ao final, é exibido o total de erros encontrados.

🧠 Conceitos praticados
Streams de leitura e escrita (fs.createReadStream / fs.createWriteStream)
Processamento sob demanda, evitando carregar o arquivo inteiro na memória
readline.createInterface combinado com for await...of
process.memoryUsage() para monitorar RSS e Heap
Funções assíncronas (async/await)