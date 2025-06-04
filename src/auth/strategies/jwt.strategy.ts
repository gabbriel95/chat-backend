import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from '../entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Usuario.name) private readonly userModel: Model<Usuario>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_KEY')!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<Usuario> {
    try {
      const { email } = payload;
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException(`Token no válido`);
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(`Error validando el usuario: ${error}`);
    }
  }
}
