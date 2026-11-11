import { Controller, 
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete,
         Query,
         DefaultValuePipe,
         ParseIntPipe} from "@nestjs/common";
import { AlunosService } from "./alunos.service.js";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { ApiTags, 
         ApiOperation, 
         ApiResponse,
         ApiQuery,
         } from '@nestjs/swagger';

@ApiTags('alunos')         
@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunoService : AlunosService){}
    
    @Post()
    @ApiOperation({
        summary: 'Cria a matrícula do aluno',
    })
    @ApiResponse({
        status: 201,
        description: 'A matrícula do aluno foi criada com sucesso.',
    })
    @ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos para criar a matrícula do aluno.',
    })

    create(@Body() createAlunoDto:CreateAlunoDto){
        return this.alunoService.create(createAlunoDto);
    }


    // findAll(){
    //     return this.alunoService.findAll();
    // }
    @Get()
    @ApiOperation({
        summary: 'Listar alunos com paginação'
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de alunos retornada com sucesso',

    })
    @ApiResponse({
        status: 404,
        description: 'Nenhum aluno encontrado',
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor',
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Número da página  (padrão: 1)',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Número de itens por pagina página  (padrão: 10)',
    })


    @ApiQuery
   ( {
        name:'nome',
        required: false,
        type: String,
        description:'Filtrar alunos pelo nome (Ex: Jamilly),'
    })

@ApiQuery
   ( {
        name:'curso',
        required: false,
        type: String,
        description:'Filtrar alunos pelo curso (Ex: Engenharia civil),'
    })



     findPage(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('nome')nome?: string,
        @Query('curso') curso?: string,


    ){
        return this.alunoService.findPage(page, limit,nome,curso);
     }


    @Get(':id')
    findOne(@Param('id') id: string){
        return this.alunoService.findOne(id);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto){
        return this.alunoService.update(id, updateAlunoDto);
    }
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.alunoService.remove(id);
    }
}