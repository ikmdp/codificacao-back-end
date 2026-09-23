export declare class ConvidadosService {
    private convidados;
    listarConvidados(): {
        id: number;
        nome: string;
        idade: number;
    }[];
    encontrarConvidado(id: number): {
        id: number;
        nome: string;
        idade: number;
    };
    atualizarIdade(id: number, idade: number): {
        id: number;
        nome: string;
        idade: number;
    };
    removerConvidadoLista(id: number): void;
}
