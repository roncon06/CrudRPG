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

@Controller('itens-magicos')
export class ItemMagicoController {
  constructor(private readonly service: ItemMagicoService) {}

  @Post()
  criar(@Body() dto: CriarItemMagicoDto) {
    return this.service.criar(dto);
  }

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    const item = await this.service.buscarPorId(id);
    if (!item) {
      throw new NotFoundException('Item Mágico não encontrado');
    }
    return item;
  }

  @Get('personagem/:id')
  async listarPorPersonagem(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarPorPersonagem(id);
  }

  @Get('personagem/:id/amuleto')
async buscarAmuleto(@Param('id', ParseIntPipe) id: number) {
  return this.service.buscarAmuletoDoPersonagem(id);
}

  @Put(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CriarItemMagicoDto,
  ) {
    return this.service.atualizar(id, dto);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.service.remover(id);
  }

  @Delete('removeritem/:id')
  async removerItem(@Param('id', ParseIntPipe) id: number) {
    const removido = await this.service.removerItem(id);
    if (!removido) {
      throw new NotFoundException('Item Mágico não encontrado');
    }
    return { message: 'Item Mágico removido com sucesso!' };
  }
}
