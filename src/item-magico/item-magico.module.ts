import { Module } from '@nestjs/common';
import { ItemMagicoService } from './item-magico.service';
import { ItemMagicoController } from './item-magico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemMagico } from './entities/item-magico.entity';
import { Personagem } from 'src/personagem/personagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemMagico, Personagem])],
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
})
export class ItemMagicoModule {}
