import { IsString, 
         IsNotEmpty,
         IsInt,
         Min,
         IsArray,
         ArrayMinSize} from "class-validator";
         
import { ApiProperty } from "@nestjs/swagger";         


export class CreateAlunoDto {
    
    @ApiProperty({
        example: 'Matheus Souza',
        description: 'Nome do aluno',
    })
    @IsString()
    @IsNotEmpty({
        message: 'O nome é obrigatório e não pode estar vazio!'
    })
    nome: string;


    @ApiProperty({
        example: '30',
        description: 'Idade dos alunos'
    })
    @IsInt({
        message: 'A idade deve ser um número inteiro!'
    })
    @Min(0,{
        message: 'A idade não pode ser negativa.'
    })
    idade: number;


    @ApiProperty({
        example: '9999',
        description: 'Matrícula do aluno'
    })
    @IsString()
    @IsNotEmpty({
        message: 'A Matricula é obrigatória'
    })
    matricula: string;


    @ApiProperty({
        example: ['Informatica', 'Letras Portugues'],
        description: 'Cursos do aluno'
    })
    @IsString({each: true, message:'Cada curso deve ser um texto'})
    @IsArray()
    @ArrayMinSize(1,{
        message:'O aluno deve estar matriculado em pelo menos um curso'
    })
    cursos: string[];
}