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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Personagens')
@Controller('personagens')
export class PersonagemController {
  constructor(private readonly service: PersonagemService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo personagem' })
  @ApiResponse({ status: 201, description: 'Personagem criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou regras de negócio violadas' })
  criar(@Body() dto: CriarPersonagemDto) {
    return this.service.criar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os personagens' })
  @ApiResponse({ status: 200, description: 'Lista de personagens retornada com sucesso' })
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar personagem por ID' })
  @ApiResponse({ status: 200, description: 'Personagem encontrado' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado' })
  buscar(@Param('id', ParseIntPipe) id: number) {
    return this.service.buscarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um personagem existente' })
  @ApiResponse({ status: 200, description: 'Personagem atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou personagem não encontrado' })
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CriarPersonagemDto,
  ) {
    return this.service.atualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um personagem' })
  @ApiResponse({ status: 200, description: 'Personagem removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado' })
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.service.remover(id);
  }
}
