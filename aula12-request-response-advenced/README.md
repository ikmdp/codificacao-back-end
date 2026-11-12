29/09/2026
# Aula 12 - Request e Response Avançado (NestJS)

Nesta aula aprendemos a trabalhar com **headers personalizados** e com o **objeto de resposta do Express** dentro de um controller NestJS, controlando manualmente o status HTTP, os headers e o corpo da resposta.

Exemplo prático: uma rota protegida por uma **chave de API** enviada no header da requisição.

---

## Conceitos abordados

- Ler headers da requisição com o decorator `@Headers()`
- Acessar o objeto de resposta do Express com o decorator `@Res()`
- Definir headers de resposta com `res.setHeader()`
- Definir o status HTTP com `res.status()`
- Enviar JSON com `res.json()`
- Diferença entre os status **200 (OK)** e **403 (Forbidden)**

---

## Decorators utilizados

| Decorator | Origem | Função |
|-----------|--------|--------|
| `@Controller('secret')` | `@nestjs/common` | Define o prefixo da rota (`/secret`) |
| `@Get()` | `@nestjs/common` | Define que o método responde a requisições GET |
| `@Headers('nome-do-header')` | `@nestjs/common` | Captura o valor de um header da requisição |
| `@Res()` | `@nestjs/common` | Injeta o objeto `Response` do Express |

---

## Código da aula

`src/seguranca.controller.ts`

```typescript
import { Controller, Get, Headers, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('secret')
export class SegurancaController {
  @Get()
  acessAreaSecret(
    @Headers('y-api-key') apikey: string,
    @Res() res: Response,
  ) {
    if (apikey === 'FULLSTACK-2026') {
      res.setHeader('y-auth-status', 'verificado');

      return res.status(200).json({
        mensagem: 'Acesso concedido a Area secreta',
        log: new Date(),
      });
    }

    return res.status(403).json({
      erro: 'Forbidden',
      mensagem: 'Chave de acesso inválida',
      log: new Date(),
    });
  }
}
```

> Lembre de registrar o `SegurancaController` na lista `controllers` do `app.module.ts`.

---

## Como funciona

1. O cliente faz uma requisição `GET /secret` enviando o header `y-api-key`.
2. O `@Headers('y-api-key')` captura o valor desse header e guarda na variável `apikey`.
3. O controller compara a chave recebida com a chave esperada (`FULLSTACK-2026`):
   - **Chave correta:** adiciona o header de resposta `y-auth-status: verificado` e devolve **status 200** com uma mensagem de sucesso.
   - **Chave incorreta ou ausente:** devolve **status 403 (Forbidden)** com uma mensagem de erro.
4. Nos dois casos a resposta inclui a data/hora da requisição no campo `log`.

---

## Como testar

Suba a aplicação:

```bash
npm run start:dev
```

### Com chave válida

```bash
curl -i http://localhost:3000/secret -H "y-api-key: FULLSTACK-2026"
```

Resposta esperada:

```
HTTP/1.1 200 OK
y-auth-status: verificado

{
  "mensagem": "Acesso concedido a Area secreta",
  "log": "2026-09-29T20:00:00.000Z"
}
```

### Com chave inválida (ou sem o header)

```bash
curl -i http://localhost:3000/secret -H "y-api-key: CHAVE-ERRADA"
```

Resposta esperada:

```
HTTP/1.1 403 Forbidden

{
  "erro": "Forbidden",
  "mensagem": "Chave de acesso inválida",
  "log": "2026-09-29T20:00:00.000Z"
}
```

Também é possível testar pelo **Postman**, **Insomnia** ou **Thunder Client**, adicionando o header `y-api-key` na aba *Headers*.

---

## Pontos de atenção

- **Ao usar `@Res()`, o Nest deixa de gerenciar a resposta automaticamente.** Você passa a ser responsável por enviar a resposta (`res.json()`, `res.send()`, etc.). Se esquecer, a requisição fica pendurada.
- Se quiser manter o comportamento padrão do Nest e apenas mexer em headers/status, use `@Res({ passthrough: true })`.
- O uso de `import type { Response }` é apenas para tipagem, o `Response` não existe em tempo de execução.
- Headers HTTP são **case-insensitive**: `y-api-key` e `Y-Api-Key` são tratados como o mesmo header.
- Deixar a chave fixa no código serve apenas para fins didáticos. Em projetos reais, use **variáveis de ambiente** (`.env`) e, de preferência, **Guards** do NestJS para autenticação.

---

## Resumo

| Situação | Status | Header de resposta | Corpo |
|----------|--------|--------------------|-------|
| Chave correta | `200 OK` | `y-auth-status: verificado` | Mensagem de acesso concedido |
| Chave incorreta/ausente | `403 Forbidden` | (nenhum) | Erro e mensagem de chave inválida |