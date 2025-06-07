import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  uid: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.header('x-token');

    if (!token) {
      throw new UnauthorizedException('No hay token en la petición');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload; // Asegurar que es JwtPayload
      req['uid'] = decoded.uid; // Ahora sí puedes acceder a uid
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token no es válido');
    }
  }
}
