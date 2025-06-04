import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MensajeModule } from './mensaje/mensaje.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://chet_main_user:mjiJ5AYNsbDWCp8w@micluster.xjdiis6.mongodb.net/chatdb',
    ),
    MensajeModule,
    AuthModule,
  ],
})
export class AppModule {}
