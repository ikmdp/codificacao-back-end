var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException } from "@nestjs/common";
let ConvidadosService = class ConvidadosService {
    convidados = [
        { id: 1, nome: 'Rebeca', idade: 20 },
        { id: 2, nome: 'Leonardo', idade: 18 },
        { id: 3, nome: 'Sergio', idade: 18 },
        { id: 4, nome: 'Jamily', idade: 22 },
        { id: 5, nome: 'Alvaro', idade: 21 },
    ];
    listarConvidados() {
        return this.convidados;
    }
    encontrarConvidado(id) {
        const convidado = this.convidados.find((buscarConvidado) => buscarConvidado.id === id);
        if (!convidado) {
            throw new NotFoundException(`[ADMINISTRADOR] Convidado com ID ${id} não encontrado!`);
        }
        return convidado;
    }
    atualizarIdade(id, idade) {
        const convidado = this.encontrarConvidado(id);
        convidado.idade = idade;
        return convidado;
    }
    removerConvidadoLista(id) {
        const index = this.convidados.findIndex((convidado) => convidado.id === id);
        if (id === -1) {
            throw new NotFoundException(`[ADMINISTRADOR] Convidado com ID ${id} não encontrado!`);
        }
        this.convidados.slice(index, 1);
    }
};
ConvidadosService = __decorate([
    Injectable()
], ConvidadosService);
export { ConvidadosService };
//# sourceMappingURL=convidados.Service.js.map