import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm-config';
import { PersonagemModule } from './personagem/personagem.module';
import { ItemMagicoModule } from './item-magico/item-magico.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), PersonagemModule, ItemMagicoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
