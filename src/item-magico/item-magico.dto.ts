import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { TipoItem } from './entities/item-magico.entity';

export class CriarItemMagicoDto {
  @IsNotEmpty()
  nome: string;

  @IsEnum(TipoItem)
  tipo: TipoItem;

  @IsInt()
  @Min(0)
  @Max(10)
  forca: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defesa: number;

  @IsInt()
  personagemId: number;
}
