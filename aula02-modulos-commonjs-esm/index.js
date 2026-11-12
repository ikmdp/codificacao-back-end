import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatLog } from './utilitario.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function salvarLogSistema(mensagemLog) {
    try{
        const pastaLog = path.join(__dirname,'Log');
        const arquivoLog = path.join(pastaLog,'syslog.log');

        await fs.mkdir(pastaLog,{recursive:true});
        const registro = formatLog(mensagemLog);
        await fs.appendFile(arquivoLog, registro, 'utf-8');


        console.log('Log Registrado com Sucesso...');
    }catch(erro){
        console.error('Erro ao registrar o Log: ', erro);
    }
}

salvarLogSistema('Inicialização do servidor\n');
salvarLogSistema('Conexão com banco de dados está estabelecido!\n');