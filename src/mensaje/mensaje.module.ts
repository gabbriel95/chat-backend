import { Module } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mensaje, MensajeSchema } from './entities/mensaje.entity';

@Module({
  controllers: [MensajeController],
  providers: [MensajeService],
  imports: [
    MongooseModule.forFeature([{ name: Mensaje.name, schema: MensajeSchema }]),
  ],
  exports: [MongooseModule],
})
export class MensajeModule {}
