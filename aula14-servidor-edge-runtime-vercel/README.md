# Aula 14 - Servidor Edge Runtime com Vercel

Função serverless que roda na borda de rede (Edge), publicada na Vercel.

## Objetivos

- Entender o que é Edge Runtime
- Criar um handler com a API padrão Request/Response
- Usar a Vercel CLI (login, dev, deploy)
- Testar a rota com o Thunder Client

## Arquivo: api/hora-servidor.ts

    export const config = {
      runtime: 'edge',
    };

    export default async function handler(req: Request) {
      const inicio = new Date();

      return new Response(
        JSON.stringify({
          mensagem: 'Função executada na borda de rede',
          horarioDoServidor: new Date().toISOString(),
          regiao: 'local-dev',
          tempoDeExecucao: `${Date.now() - inicio.getTime()} ms`,
        }),
        {
          status: 200,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

## Passo a passo

1. Instalar: `npm install -g vercel` (ou `npx vercel`)
2. Login: `vercel login`
3. Deploy: `vercel`
4. Rodar local: `vercel dev` (http://localhost:3000)
5. Testar (GET): `http://localhost:3000/api/hora-servidor`

## Resposta esperada (200 OK)

    {
      "mensagem": "Função executada na borda de rede",
      "horarioDoServidor": "2026-10-07T00:02:39.325Z",
      "regiao": "local-dev",
      "tempoDeExecucao": "0 ms"
    }

## Observações

- O primeiro deploy vai para produção; os próximos são preview (`vercel --prod`).
- Com Deployment Protection ativa, use `vercel curl <url>`.
- `regiao` está fixa como 'local-dev'.

## Git

    git add .
    git commit -m "feat: aula 14 - edge runtime com Vercel"
    git push