import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ItemMagicoService } from './item-magico.service';
import { CriarItemMagicoDto } from './item-magico.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Itens Mágicos')
@Controller('itens-magicos')
export class ItemMagicoController {
  constructor(private readonly service: ItemMagicoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo item mágico' })
  @ApiResponse({ status: 201, description: 'Item Mágico criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  criar(@Body() dto: CriarItemMagicoDto) {
    return this.service.criar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens mágicos' })
  @ApiResponse({ status: 200, description: 'Lista de itens retornada com sucesso' })
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item mágico por ID' })
  @ApiResponse({ status: 200, description: 'Item Mágico encontrado' })
  @ApiResponse({ status: 404, description: 'Item Mágico não encontrado' })
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    const item = await this.service.buscarPorId(id);
    if (!item) {
      throw new NotFoundException('Item Mágico não encontrado');
    }
    return item;
  }

  @Get('personagem/:id')
  @ApiOperation({ summary: 'Listar itens mágicos de um personagem' })
  @ApiResponse({ status: 200, description: 'Itens encontrados com sucesso' })
  listarPorPersonagem(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarPorPersonagem(id);
  }

  @Get('personagem/:id/amuleto')
  @ApiOperation({ summary: 'Buscar amuleto do personagem' })
  @ApiResponse({ status: 200, description: 'Amuleto encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Amuleto não encontrado' })
  buscarAmuleto(@Param('id', ParseIntPipe) id: number) {
    return this.service.buscarAmuletoDoPersonagem(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um item mágico' })
  @ApiResponse({ status: 200, description: 'Item Mágico atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Item Mágico não encontrado' })
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CriarItemMagicoDto,
  ) {
    return this.service.atualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover item mágico por ID' })
  @ApiResponse({ status: 200, description: 'Item Mágico removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Item Mágico não encontrado' })
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.service.remover(id);
  }

  @Delete('removeritem/:id')
  @ApiOperation({ summary: 'Remover item mágico do personagem' })
  @ApiResponse({ status: 200, description: 'Item Mágico removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Item Mágico não encontrado' })
  async removerItem(@Param('id', ParseIntPipe) id: number) {
    const removido = await this.service.removerItem(id);
    if (!removido) {
      throw new NotFoundException('Item Mágico não encontrado');
    }
    return { message: 'Item Mágico removido com sucesso!' };
  }
}
