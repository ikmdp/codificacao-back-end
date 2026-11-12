import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController{
  @Get()
  getPublic(){
    return{
      mensagem: 'Rota Pública Acessada com Sucesso!',
      data: new Date()
    }
  }
  @Get('admin')
  getPrivate(){
    return{
      mensagem: 'Bem-Vindo ao Painel ADMIN',
      data: new Date(),
    }
  }
}