import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { colaboradoresController } from './colaboradores.controller.js';
import { ZodValidationPipe } from './zode-validation.pipe.js';


@Module({
  imports: [ZodValidationPipe],
  controllers: [AppController, colaboradoresController],
  providers: [AppService],
})
export class AppModule {}
