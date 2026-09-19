readme criado no dia 18/09/2026
Aula 04 — Tratamento Global de Exceções

1. Objetivo

Aprender a tratar erros de forma centralizada em uma aplicação Express, cobrindo
erros síncronos, erros assíncronos (Promises) e falhas não capturadas no nível
do processo Node.js, evitando que a aplicação quebre de forma inesperada.

2. Conceitos da aula

Middleware de tratamento de erros no Express (err, req, res, next)
Uso de next(erro) para encaminhar exceções ao middleware de erro
Tratamento de erros síncronos com try/catch
Tratamento de erros assíncronos com async/await e try/catch
Eventos globais do processo: uncaughtException e unhandledRejection
Padronização das respostas de erro em formato JSON

3. Estrutura do projeto

aula04-tratamento-global-excecoes/
├── app.js
├── package.json
└── package-lock.json

4. Código (app.js)

import express from 'express';

const app = express();
app.use(express.json());

process.on('uncaughtException', (err) => {
    console.error('[ERRO DE PROCESSO - uncaughtExeption]: ', err.message );
});
process.on('unhandledRejection', (reason) => {
    console.error('[PROMISE REJEITADA - unhandledRejection]: ', reason);
});

app.get('/sucesso', (req, res) => {
    res.json({success: true, message: 'Operação Realizada com Sucesso!'});
});

app.get('/erro-sincrono', (req, res, next) => {
    try{
        throw new Error('Falha ao Processar a Regra do Negócio!');
    }catch(erro){
        next(erro);
    }
});

app.get('/erro-assincrono', async(req, res, next) => {
    try{
        await Promise.reject(new Error('Erro na Consulta no Banco de Dados Externo'));
    }catch(erro){
        next(erro);
    }
});

app.use((err, req, res, next) => {
    console.error(`[LOG DE ERRO INTERNO]: ${err.stack}`);

    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Erro interno do Servidor'
    });
});

app.listen(3000, () => {
    console.log('Servidor Imortal rodando na Porta 3000');
});

5. Passo a passo do código

1. const app = express() cria a aplicação e app.use(express.json()) habilita
   o parsing automático de corpos de requisição em JSON.

2. process.on('uncaughtException', ...) captura erros síncronos que escapam
   de qualquer try/catch em todo o processo Node.js, registrando-os no
   console em vez de derrubar a aplicação sem aviso.

3. process.on('unhandledRejection', ...) captura Promises rejeitadas que não
   possuem nenhum .catch() ou try/catch associado, evitando falhas silenciosas.

4. GET /sucesso responde normalmente com uma mensagem de sucesso em JSON,
   servindo como rota de controle (sem erro).

5. GET /erro-sincrono lança um erro dentro de um try/catch e o repassa com
   next(erro), delegando o tratamento ao middleware de erro em vez de tratar
   a resposta ali mesmo.

6. GET /erro-assincrono usa async/await com Promise.reject dentro de um
   try/catch, repassando o erro da mesma forma com next(erro). É o padrão
   correto para capturar falhas em operações assíncronas (ex: chamadas a
   banco de dados ou APIs externas).

7. app.use((err, req, res, next) => {...}) é o middleware de tratamento de
   erros. O Express reconhece esse middleware pela presença dos 4 parâmetros
   (err, req, res, next). Ele:
   - registra o erro completo (err.stack) no console para depuração;
   - define o status HTTP (usa err.status se existir, senão 500);
   - responde ao cliente em JSON padronizado, sem expor detalhes internos.

8. app.listen(3000, ...) inicia o servidor na porta 3000.

6. Diferença entre os tipos de erro tratados

Tipo de erro                 | Onde ocorre                        | Como é tratado
------------------------------|-------------------------------------|--------------------------------
Erro síncrono em rota         | Dentro de um handler de rota        | try/catch + next(erro)
Erro assíncrono em rota       | Dentro de um handler async          | try/catch (com await) + next(erro)
Exceção não capturada         | Em qualquer parte do processo       | process.on('uncaughtException')
Promise rejeitada sem catch   | Em qualquer parte do processo       | process.on('unhandledRejection')

7. Executando o projeto

node app.js

Saída esperada no terminal:

Servidor Imortal rodando na Porta 3000

8. Testando as rotas

GET http://localhost:3000/sucesso
-> 200 { "success": true, "message": "Operação Realizada com Sucesso!" }

GET http://localhost:3000/erro-sincrono
-> 500 { "success": false, "message": "Falha ao Processar a Regra do Negócio!" }

GET http://localhost:3000/erro-assincrono
-> 500 { "success": false, "message": "Erro na Consulta no Banco de Dados Externo" }

9. Boas práticas destacadas

Nunca deixar a aplicação quebrar sem log ao capturar exceções globais
Centralizar o tratamento de erros em um único middleware
Sempre encaminhar erros com next(erro) em vez de tratá-los localmente em cada rota
Não expor detalhes sensíveis do erro (como stack trace) diretamente ao cliente
Definir uma mensagem padrão de erro para casos sem mensagem específica

10. Próximos passos

Criar classes de erro customizadas (ex: NotFoundError, ValidationError)
Usar err.status para diferenciar códigos HTTP (400, 401, 404, 500, etc.)
Integrar um logger mais robusto (ex: winston ou pino) no lugar de console.error
Encerrar o processo de forma controlada após uncaughtException em produção