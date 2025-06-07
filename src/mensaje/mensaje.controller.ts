import { Controller, Get, Body, Req, Param, UseGuards } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('mensaje')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}

  @UseGuards(AuthGuard('jwt')) // Usa la estrategia de Passport
  @Get(':de')
  async obtenerChat(@Req() req, @Param('de') mensajesDe: string) {
    const miId = req.user._id; // Aquí accedes al usuario autenticado
    console.log(miId);
    const mensajes = await this.mensajeService.obtenerChat(miId, mensajesDe);
    return { ok: true, mensajes };
  }
}
