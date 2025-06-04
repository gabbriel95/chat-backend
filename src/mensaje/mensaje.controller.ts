import { Controller, Get, Body } from '@nestjs/common';
import { MensajeService } from './mensaje.service';

@Controller('mensaje')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}

  @Get()
  findAll() {
    return this.mensajeService.findAll();
  }
}
