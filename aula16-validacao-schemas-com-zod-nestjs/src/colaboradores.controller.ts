import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { colaboradorSchema} from "./colaborador.schemas.js";
import type { Colaborador } from "./colaborador.schemas.js";
import { ZodValidationPipe } from "./zode-validation.pipe.js";

@Controller('colaboradores')
export class colaboradoresController {
    @Post()
    @UsePipes(new ZodValidationPipe(colaboradorSchema))
    async create(@Body() body: Colaborador){
        return{
            mensagem: 'Colaborador cadastrado com sucesso',
            dados: body, 
        }
    }
}



