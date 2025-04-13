import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personagem } from './personagem.entity';
import { CriarPersonagemDto } from './personagem.dto';

@Injectable()
export class PersonagemService {
  constructor(
    @InjectRepository(Personagem)
    private readonly personagemRepository: Repository<Personagem>,
  ) {}

  async criar(dto: CriarPersonagemDto): Promise<Personagem> {
    const total = dto.forcaBase + dto.defesaBase;
    if (total > 10) {
      throw new BadRequestException('A soma de Força e Defesa não pode passar de 10.');
    }

    const personagem = this.personagemRepository.create(dto);
    return this.personagemRepository.save(personagem);
  }

  async listar(): Promise<Personagem[]> {
    return this.personagemRepository.find({
      relations: ['itensMagicos'],
    });
  }

  async buscarPorId(id: number): Promise<Personagem> {
    const personagem = await this.personagemRepository.findOne({
      where: { id },
      relations: ['itensMagicos'],
    });
  
    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado.');
    }
  
    return personagem;
  }
  

  async atualizar(id: number, dto: CriarPersonagemDto): Promise<Personagem> {
    const personagem = await this.personagemRepository.findOne({
      where: { id },
      relations: ['itensMagicos'],
    });
  
    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado.');
    }
  
    const totalPontos = dto.forcaBase + dto.defesaBase;
    if (totalPontos > 10) {
      throw new BadRequestException('A soma de Força e Defesa não pode ultrapassar 10 pontos.');
    }
  
    
    personagem.nome = dto.nome;
    personagem.nomeAventureiro = dto.nomeAventureiro;
    personagem.classe = dto.classe;
    personagem.level = dto.level;
    personagem.forcaBase = dto.forcaBase;
    personagem.defesaBase = dto.defesaBase;
  
    await this.personagemRepository.save(personagem);
  
    return personagem;
  }
  
  
  async remover(id: number): Promise<void> {
    await this.personagemRepository.delete(id);
  }
}
