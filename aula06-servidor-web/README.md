18/09/2026
📘 Aula 06 — Servidor Web com o módulo http nativo
1. Objetivo

Criar um servidor HTTP usando apenas o módulo nativo http do Node.js (sem frameworks como Express), aplicando cabeçalhos de segurança, tratamento de rotas e resposta em formato JSON.

2. Conceitos da aula
Criação de um servidor com http.createServer()
Leitura de req.method e req.url para identificar a requisição
Cabeçalhos HTTP de segurança (X-Content-Type-Options, X-Frame-Options)
Roteamento manual simples (if/else) por URL
Respostas em JSON com res.writeHead() e res.end()
Tratamento de rota não encontrada (404)
3. Estrutura do projeto
aula06-servidor-web/
├── package.json
├── README.md
└── servidor.js
4. Como funciona, passo a passo
Etapa	O que faz
http.createServer()	Cria o servidor e define o callback executado a cada requisição
console.log(...)	Registra no terminal o método HTTP e a rota acessada
cabecalhoPadrao	Objeto com cabeçalhos de segurança aplicados em toda resposta
if(req.url === '/status')	Roteamento manual: verifica a URL acessada
res.writeHead(200, {...})	Define status de sucesso e cabeçalhos (padrão + content-type)
res.end(JSON.stringify(...))	Envia o corpo da resposta em formato JSON
else { ... 404 ... }	Trata qualquer rota não mapeada, retornando erro 404
servidorWeb.listen(3000, ...)	Inicia o servidor na porta 3000