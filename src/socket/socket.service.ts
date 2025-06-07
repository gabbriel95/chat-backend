import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(Usuario.name) private readonly userModel: Model<Usuario>,
    @InjectModel(Mensaje.name) private readonly mensajeModel: Model<Mensaje>,

    private readonly jwtService: JwtService,
  ) {}

  async usuarioConectado(uid: string) {
    const usuario = await this.userModel.findById(uid);
    console.log('usuario conectado');
    if (!usuario) return null;
    usuario.online = true;
    await usuario.save();
    return usuario;
  }

  async usuarioDesconectado(uid: string) {
    const usuario = await this.userModel.findById(uid);
    console.log('usuario desconectado');
    if (!usuario) return null;
    usuario.online = false;
    await usuario.save();
    return usuario;
  }

  async getUsuarios() {
    const usuarios = await this.userModel.find().sort('-online');
    //console.log(usuarios);
    return usuarios;
  }

  async grabarMensaje(payload) {
    try {
      const mensaje = new Mensaje(payload);
      await mensaje.save();

      return mensaje;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
