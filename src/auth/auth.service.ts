import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { Usuario } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private readonly userModel: Model<Usuario>,
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

      return {
        ok: true,
        usuario,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        msg: 'Error al crear el usuario',
      };
    }
  }
}
