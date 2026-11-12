import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentUrl = req.originalUrl || req.url;
    console.log (`[LOG] Método: ${req.method} | Rota: ${req.path}`);
    if(currentUrl.startsWith('')){
      const base = req.headers['x-user-base'];
      if(base !== 'Administrador'){
        return res.status(403).json({
          codigo: 403,
          mensagem: 'Acesso Negado: Privilégio de Administrador necessário',
          registro: new Date,
        })
      }
    }
    next();
  }
}
