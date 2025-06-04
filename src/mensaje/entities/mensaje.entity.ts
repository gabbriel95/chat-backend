import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Mensaje extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  de: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  para: Types.ObjectId;

  @Prop({ required: true })
  mensaje: string;
}

export const MensajeSchema = SchemaFactory.createForClass(Mensaje);
