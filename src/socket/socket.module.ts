import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MensajeModule } from 'src/mensaje/mensaje.module';

@Module({
  providers: [SocketGateway, SocketService],
  imports: [AuthModule, MensajeModule],
})
export class SocketModule {}
