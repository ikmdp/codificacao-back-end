import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutosService {
    produtos = [
        {id: 1, nome: 'Arroz Namorados', preco: 9.99},
        {id: 2, nome: 'Feijão Timbiras', preco: 7.99},
        {id: 3, nome: 'Macarrão Galo', preco: 5.99},
        {id: 4, nome: 'Açúcar União', preco: 4.99},
        {id: 5, nome: 'Sal Lebre', preco: 2.99},


    ];
    listarProdutos(){
        return this.produtos;
    }
}


