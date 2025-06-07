import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensaje } from './entities/mensaje.entity';
import { Types } from 'mongoose';

@Injectable()
export class MensajeService {
  constructor(
    @InjectModel(Mensaje.name) private mensajeModel: Model<Mensaje>,
  ) {}

  async obtenerChat(miId: string, mensajesDe: string) {
    console.log(miId, mensajesDe); // Verifica que los valores sean correctos

    return this.mensajeModel
      .find({
        $or: [
          {
            de: new Types.ObjectId(miId),
            para: new Types.ObjectId(mensajesDe),
          },
          {
            de: new Types.ObjectId(mensajesDe),
            para: new Types.ObjectId(miId),
          },
        ],
      })
      .sort({ createdAt: 'asc' })
      .limit(30);
  }
}
