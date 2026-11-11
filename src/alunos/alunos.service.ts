import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAlunoDto } from "./dto/create-aluno.dto.js";
import { UpdateAlunoDto } from "./dto/update-aluno.dto.js";
import { Aluno, AlunoDoc } from "./schemas/aluno.schema.js";

@Injectable()
export class AlunosService {
    constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDoc>) {}

    async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
        const createdAluno = new this.alunoModel(createAlunoDto);
        return createdAluno.save(); //!POST
    }

    //! MÉTODO PARA BUSCAR ALUNOS COM PAGINAÇÃO E FILTROS
    async findPage(page: number, limit: number, nome?: string, curso?: string) {
        const skip = (page - 1) * limit;
        const filter: any = {};

        // Filtro por NOME (busca parcial e ignora maiúsculas/minúsculas)
        if (nome) {
            filter.nome = { $regex: nome, $options: 'i' };
        }

        // Filtro por CURSO (ajustado para 'cursos' em minúsculo, igual ao BD)
        if (curso) {
            filter.cursos = { $regex: curso, $options: 'i' };
        }

        const [data, total] = await Promise.all([
            this.alunoModel.find(filter).skip(skip).limit(limit).exec(),
            this.alunoModel.countDocuments(filter).exec(),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string): Promise<Aluno> {
        const aluno = await this.alunoModel.findById(id).exec();

        if (!aluno) {
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return aluno;
    } //!GET

    async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
        const alunoAtualizado = await this.alunoModel.findByIdAndUpdate(id, updateAlunoDto, {
            new: true
        }).exec();

        if (!alunoAtualizado) {
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return alunoAtualizado;
    } //!PATCH

    async remove(id: string): Promise<Aluno> {
        const alunoRemovido = await this.alunoModel.findByIdAndDelete(id).exec();
        
        if (!alunoRemovido) {
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        return alunoRemovido;
    } //!DELETE
    //!CRUD
}