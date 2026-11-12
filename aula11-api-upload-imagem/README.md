28/09/2026
# Aula 11 - Upload de Imagens (NestJS + Multer)

Nesta aula aprendemos a receber **arquivos enviados pelo cliente** (upload de imagens) em uma API NestJS, usando o **Multer** por meio do `FileInterceptor`. O arquivo é salvo em disco com um nome único, validado por tipo e tamanho, e a API devolve a URL para acessá-lo.

---

## Conceitos abordados

- Receber arquivos com requisições `multipart/form-data`
- Interceptar a requisição com `@UseInterceptors()` e `FileInterceptor`
- Acessar o arquivo enviado com `@UploadedFile()`
- Salvar o arquivo em disco com `diskStorage` (Multer)
- Gerar nomes únicos de arquivo com `uuid`
- Limitar o tamanho do arquivo com `limits`
- Filtrar os tipos de arquivo aceitos com `fileFilter`
- Tratar erros com `BadRequestException`

---

## Dependências

```bash
npm install uuid
npm install -D @types/multer
```

> O `multer` e o `@nestjs/platform-express` já vêm com o NestJS quando se usa o Express (padrão). Se o seu projeto não tiver o `multer`, instale com `npm install multer`.

---

## Estrutura de pastas

```
projeto/
├── src/
│   ├── imagem.controller.ts
│   └── app.module.ts
└── uploads/          <- pasta onde as imagens serão salvas
```

Crie a pasta `uploads` na raiz do projeto antes de testar.

---

## Código da aula

`src/imagem.controller.ts`

```typescript
import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";

@Controller('imagem')
export class ImagemController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const nomeArquivo = `${uuidv4()}${extname(file.originalname)}`;
                    callback(null, nomeArquivo);
                },
            }),
            limits: { fileSize: 2 * 1024 * 1024 },
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                    return callback(
                        new BadRequestException('Apenas arquivos jpg, jpeg, png, gif, webp sao suportados'),
                        false,
                    );
                }
                callback(null, true);
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Nenhum arquivo enviado.');
        }
        return {
            filename: file.filename,
            size: file.size,
            url: `http://localhost:3000/api/uploads/${file.filename}`,
        };
    }
}
```

> Lembre de registrar o `ImagemController` na lista `controllers` do `app.module.ts`.

---

## Como funciona

1. O cliente envia uma requisição `POST /imagem/upload` no formato `multipart/form-data`, com o arquivo no campo chamado **`file`**.
2. O `FileInterceptor('file', {...})` intercepta a requisição, lê o campo `file` e aplica as configurações abaixo.
3. **`storage: diskStorage`** define onde e com qual nome o arquivo será salvo:
   - `destination`: pasta de destino (`./uploads`).
   - `filename`: gera um nome único usando `uuid` e mantém a extensão original com `extname`. Isso evita que arquivos com o mesmo nome se sobrescrevam.
4. **`limits`** restringe o tamanho do arquivo. Aqui, `2 * 1024 * 1024` = **2 MB**.
5. **`fileFilter`** valida o tipo do arquivo pelo `mimetype`. Se não for jpg, jpeg, png, gif ou webp, a requisição é rejeitada com `BadRequestException`.
6. Se tudo estiver certo, o método `uploadFile` recebe o arquivo em `@UploadedFile()` e devolve o nome salvo, o tamanho e a URL de acesso.
7. Se nenhum arquivo for enviado, o método lança `BadRequestException('Nenhum arquivo enviado.')`.

---

## Como testar

Suba a aplicação:

```bash
npm run start:dev
```

### Com curl

```bash
curl -X POST http://localhost:3000/imagem/upload -F "file=@./foto.png"
```

### Com Postman / Insomnia / Thunder Client

1. Método: `POST`
2. URL: `http://localhost:3000/imagem/upload`
3. Aba **Body** -> **form-data**
4. Adicione uma chave chamada `file`, altere o tipo para **File** e selecione a imagem.

### Resposta esperada (sucesso)

```json
{
  "filename": "3f2b9c1e-8a4d-4c7e-9b1a-2d5e6f7a8b9c.png",
  "size": 48213,
  "url": "http://localhost:3000/api/uploads/3f2b9c1e-8a4d-4c7e-9b1a-2d5e6f7a8b9c.png"
}
```

### Erros possíveis

| Situação | Resposta |
|----------|----------|
| Tipo de arquivo inválido (ex.: `.pdf`) | `400 Bad Request` - "Apenas arquivos jpg, jpeg, png, gif, webp sao suportados" |
| Nenhum arquivo enviado | `400 Bad Request` - "Nenhum arquivo enviado." |
| Arquivo maior que 2 MB | `413 Payload Too Large` |

---

## Servindo as imagens salvas

A `url` retornada (`/api/uploads/...`) só funciona se a API estiver configurada para:

1. Usar o prefixo global `api` (`app.setGlobalPrefix('api')` no `main.ts`), e
2. Servir a pasta `uploads` como arquivos estáticos, por exemplo com `app.useStaticAssets(...)` (usando `NestExpressApplication`) ou com o `ServeStaticModule`.

Sem essa configuração, o upload funciona e o arquivo é salvo em disco, mas o link retornado não abrirá no navegador.

---

## Pontos de atenção

- O nome do campo no `FileInterceptor('file')` **precisa ser igual** ao nome do campo enviado pelo cliente, senão o arquivo chega como `undefined`.
- O `fileFilter` valida o `mimetype` informado pelo cliente, que pode ser falsificado. Em projetos reais, valide também o conteúdo do arquivo.
- Adicione a pasta `uploads/` ao `.gitignore` para não enviar as imagens de teste ao repositório.
- Use `uuid` no nome do arquivo para evitar conflitos e não expor o nome original enviado pelo usuário.
- A `url` está fixa em `localhost:3000`. Em produção, use uma variável de ambiente para o endereço base.

---

## Resumo

| Recurso | Função |
|---------|--------|
| `FileInterceptor('file')` | Intercepta o upload do campo `file` |
| `diskStorage` | Define pasta e nome do arquivo salvo em disco |
| `uuidv4()` + `extname()` | Gera nome único mantendo a extensão |
| `limits.fileSize` | Limita o tamanho (2 MB) |
| `fileFilter` | Aceita apenas jpg, jpeg, png, gif e webp |
| `@UploadedFile()` | Acessa o arquivo dentro do método |
| `BadRequestException` | Retorna erro 400 para arquivo inválido ou ausente |