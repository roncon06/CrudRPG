import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CriarPersonagemDto } from './personagem.dto';

@Controller('personagens')
export class PersonagemController {
  constructor(private readonly service: PersonagemService) {}

  @Post()
  criar(@Body() dto: CriarPersonagemDto) {
    return this.service.criar(dto);
  }

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number) {
    return this.service.buscarPorId(id);
  }

  @Put(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CriarPersonagemDto,
  ) {
    return this.service.atualizar(id, dto);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.service.remover(id);
  }
}
