import { Module } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personagem } from './personagem.entity';
import { ItemMagico } from 'src/item-magico/entities/item-magico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Personagem, ItemMagico])],
  controllers: [PersonagemController],
  providers: [PersonagemService],
})
export class PersonagemModule {}
