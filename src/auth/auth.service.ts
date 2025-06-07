import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { Usuario } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private readonly userModel: Model<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, nombre, password } = createUserDto;

      const existeEmail = await this.userModel.findOne({ email });

      if (existeEmail) {
        return {
          msg: `El correo ${email} ya esta registrado`,
        };
      }

      const usuario = new this.userModel({
        email,
        nombre,
        password,
      });

      usuario.password = bcrypt.hashSync(password, 10);

      await usuario.save();

      const token = this.getJwtToken({ email, _id: usuario._id as string });

      return {
        ok: true,
        usuario,
        token,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: 'Error al crear el usuario',
      };
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const usuarioDb = await this.userModel.findOne({ email });

      if (!usuarioDb) {
        return {
          ok: false,
          msg: 'El usuario no existe',
        };
      }

      const validPassword = bcrypt.compareSync(password, usuarioDb.password);

      if (!validPassword) {
        return {
          ok: false,
          msg: 'Password incorrecto',
        };
      }
      const token = this.getJwtToken({ email, _id: usuarioDb._id as string });

      return {
        ok: true,
        usuario: usuarioDb,
        token,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: 'Error al iniciar sesion',
      };
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  validarJwtToken(token: string) {
    try {
      const payload: { _id: string } = this.jwtService.verify(token);
      const { _id } = payload;
      return [true, _id];
    } catch (error) {
      console.log(error);
      return [false, null];
    }
  }
}
