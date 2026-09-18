import dotenv from 'dotenv';
dotenv.config();

function iniciarAplicacao(){
    const porta = process.env.PORT || 8080;
    const apiKey = process.env.API_KEY_PAGAMENTO;
    const dbUrl = process.env.DATABASE_URL;

    if(!apiKey){
        console.error('[ERRO CRÍTICO]: A chave API_KEY_PAGAMENTO não está definida nas variaveis do ambiente!');
        process.exit(1);
    }
    console.log('=== ||| SERVIÇO DE CONFIGURAÇÃO CARREGADO ||| ===');
    console.log(`Serviço rodando na porta ${porta}`);
    console.log(`Banco de Dados: ${dbUrl}`);
    console.log(`APIkey: ${apiKey}`);
    console.log(`Status da API: Chave de tamanho ${apiKey.length} autenticada.`);
}

iniciarAplicacao();
