import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({
    required: true,
  })
  nombre: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: false,
  })
  online: boolean;
}

export const UserSchema = SchemaFactory.createForClass(Usuario);
