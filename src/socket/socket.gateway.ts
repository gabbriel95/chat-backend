import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly socketService: SocketService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(socket: Socket) {
    const token = socket.handshake.query['x-token'];

    const [valido, uid] = this.authService.validarJwtToken(token as string);

    if (!valido && uid == null) {
      console.log('socket no identificado');
      return socket.disconnect();
    }

    if (uid !== null) {
      await this.socketService.usuarioConectado(uid.toString());
    }

    await socket.join(uid!.toString());

    this.server.emit('lista-usuarios', await this.socketService.getUsuarios());

    socket.on('mensaje-personal', async (payload) => {
      const mensaje = await this.socketService.grabarMensaje(payload);
      this.server.to(payload.para).emit('mensaje-personal', mensaje);
      this.server.to(payload.de).emit('mensaje-personal', mensaje);
    });

    socket.on('disconnect', async () => {
      await this.socketService.usuarioDesconectado(uid!.toString());
      this.server.emit(
        'lista-usuarios',
        await this.socketService.getUsuarios(),
      );
    });
  }

  handleDisconnect(socket: Socket) {
    //console.log(socket.id);
  }
}
