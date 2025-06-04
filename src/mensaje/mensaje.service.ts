import { Injectable } from '@nestjs/common';

@Injectable()
export class MensajeService {
  findAll() {
    return `This action returns all mensaje`;
  }
}
