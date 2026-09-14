Criação do projeto aula02-modulos-commonjs-esm, com package.json configurado para uso de módulos.

Criação do arquivo utilitario.js, responsável por formatar as mensagens de log:
Função formatLog(mensagem) que gera a data atual (toISOString) e a hora atual (toLocaleTimeString) e retorna uma string no formato [data - hora]: mensagem.

Criação do arquivo index.js, responsável pela lógica principal:
Uso de fileURLToPath e path para obter __filename e __dirname (equivalentes ao CommonJS, já que em ESM eles não existem por padrão).

Função assíncrona salvarLogSistema(mensagemLog) que:
Cria (se não existir) a pasta Log;
Formata a mensagem usando formatLog;
Grava/adiciona o registro no arquivo Log/syslog.log usando fs.appendFile;
Trata erros com try/catch, exibindo mensagem no console em caso de falha.

Chamadas de teste da função para registrar mensagens como "Inicialização do servidor" e "Conexão com banco de dados estabelecido".

Execução do script via node index.js, confirmando no terminal o registro dos logs com sucesso ("Log Registrado com Sucesso...").

Verificação do resultado no arquivo Log/syslog.log, contendo as mensagens registradas com data e hora.