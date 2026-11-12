import {z} from 'zod';

export const colaboradorSchema = z.object({
    nome: z.string ()
    .min(3,{message: 'O nome deve ter no minimo 3 letras'}),
email: z.email({ message: 'O email deve ser válido!' }),
  idade: z.number({ message: 'A idade deve ser um número válido!' })
    .min(18, { message: 'A idade minima permitida é 18 anos!' })
    .max(65, { message: 'A idade máxima permitida é 65 anos!' }),
departamento: z.enum(['TI', 'RH', 'Comercial', 'Financeiro'], {
    error: () => (
        { message: 'Departamento deve ser obrigatoriamente TI,RH, Comercial ou Financeiro' }),
  }),
});
export type Colaborador= z.infer<typeof colaboradorSchema>;