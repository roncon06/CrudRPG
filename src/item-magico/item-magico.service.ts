import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemMagico, TipoItem } from './entities/item-magico.entity';
import { CriarItemMagicoDto } from './item-magico.dto';
import { Personagem } from '../personagem/personagem.entity';

@Injectable()
export class ItemMagicoService {
  constructor(
    @InjectRepository(ItemMagico)
    private readonly itemRepo: Repository<ItemMagico>,

    @InjectRepository(Personagem)
    private readonly personagemRepo: Repository<Personagem>,
  ) {}

  async criar(dto: CriarItemMagicoDto): Promise<ItemMagico> {
    const { tipo, forca, defesa, personagemId } = dto;

    if (forca === 0 && defesa === 0) {
      throw new BadRequestException('Item deve ter pelo menos 1 ponto em Força ou Defesa.');
    }

    if (tipo === TipoItem.ARMA && defesa !== 0) {
      throw new BadRequestException('Armas devem ter Defesa igual a 0.');
    }

    if (tipo === TipoItem.ARMADURA && forca !== 0) {
      throw new BadRequestException('Armaduras devem ter Força igual a 0.');
    }

    const personagem = await this.personagemRepo.findOne({
      where: { id: personagemId },
      relations: ['itensMagicos'],
    });

    if (!personagem) {
      throw new BadRequestException('Personagem não encontrado.');
    }

    if (
      tipo === TipoItem.AMULETO &&
      personagem.itensMagicos.some((item) => item.tipo === TipoItem.AMULETO)
    ) {
      throw new BadRequestException('O personagem já possui um Amuleto.');
    }

    const item = this.itemRepo.create({
      ...dto,
      personagem,
    });

    return this.itemRepo.save(item);
  }

  async listar(): Promise<ItemMagico[]> {
    return this.itemRepo.find({ relations: ['personagem'] });
  }

  async buscarPorId(id: number): Promise<ItemMagico | null> {
    return this.itemRepo.findOne({
      where: { id },
      relations: ['personagem'],
    });
  }

  async listarPorPersonagem(personagemId: number): Promise<ItemMagico[]> {
    return this.itemRepo.find({
      where: {
        personagem: { id: personagemId },
      },
      relations: ['personagem'],
    });
  }

  async buscarAmuletoDoPersonagem(personagemId: number): Promise<ItemMagico | null> {
    return this.itemRepo.findOne({
      where: {
        personagem: { id: personagemId },
        tipo: TipoItem.AMULETO,
      },
      relations: ['personagem'],
    });
  }

  async atualizar(id: number, dto: CriarItemMagicoDto): Promise<ItemMagico> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['personagem'],
    });
  
    if (!item) {
      throw new NotFoundException('Item Mágico não encontrado.');
    }
  
    if (dto.forca === 0 && dto.defesa === 0) {
      throw new BadRequestException('Item deve ter pelo menos 1 ponto em Força ou Defesa.');
    }
  
    if (dto.tipo === TipoItem.ARMA && dto.defesa !== 0) {
      throw new BadRequestException('Armas devem ter Defesa igual a 0.');
    }
  
    if (dto.tipo === TipoItem.ARMADURA && dto.forca !== 0) {
      throw new BadRequestException('Armaduras devem ter Força igual a 0.');
    }
  
    const personagem = await this.personagemRepo.findOne({
      where: { id: dto.personagemId },
      relations: ['itensMagicos'],
    });
  
    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado.');
    }
  
    const jaTemAmuleto = personagem.itensMagicos.some(
      (i) => i.tipo === TipoItem.AMULETO && i.id !== id,
    );
  
    if (dto.tipo === TipoItem.AMULETO && jaTemAmuleto) {
      throw new BadRequestException('O personagem já possui um Amuleto.');
    }
  
    item.nome = dto.nome;
    item.tipo = dto.tipo;
    item.forca = dto.forca;
    item.defesa = dto.defesa;
    item.personagem = personagem;
  
    await this.itemRepo.save(item);
  
    return item;
  }
  
  
  async remover(id: number): Promise<void> {
    await this.itemRepo.delete(id);
  }

  async removerItem(id: number): Promise<boolean> {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) return false;
    await this.itemRepo.remove(item);
    return true;
  }
}
