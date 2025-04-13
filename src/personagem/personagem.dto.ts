import { IsEnum, IsInt, IsNotEmpty, Max, Min, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Classe } from './personagem.entity';

export class CriarPersonagemDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  nomeAventureiro: string;

  @IsEnum(Classe)
  classe: Classe;

  @IsInt()
  @Min(1)
  level: number;

  @IsInt()
  @Min(0)
  @Max(10)
  forcaBase: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defesaBase: number;
}
