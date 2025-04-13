import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { TipoItem } from './entities/item-magico.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CriarItemMagicoDto {
  @ApiProperty({ example: 'Espada Flamejante', description: 'Nome do item mágico' })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ enum: TipoItem, description: 'Tipo do item mágico' })
  @IsEnum(TipoItem)
  tipo: TipoItem;

  @ApiProperty({ example: 5, description: 'Força do item (0-10)', minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @ApiProperty({ example: 3, description: 'Defesa do item (0-10)', minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;

  @ApiProperty({ example: 1, description: 'ID do personagem que possui o item' })
  @IsInt()
  personagemId: number;
}
