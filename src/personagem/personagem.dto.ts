import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Classe } from './personagem.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CriarPersonagemDto {
  @ApiProperty({ example: 'Arthas', description: 'Nome verdadeiro do personagem' })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'O Rei Lich', description: 'Nome de aventura do personagem' })
  @IsNotEmpty()
  nomeAventureiro: string;

  @ApiProperty({ enum: Classe, description: 'Classe do personagem' })
  @IsEnum(Classe)
  classe: Classe;

  @ApiProperty({ example: 1, description: 'Level inicial do personagem', minimum: 1 })
  @IsInt()
  @Min(1)
  level: number;

  @ApiProperty({ example: 5, description: 'Força base do personagem (máximo 10)', minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  forcaBase: number;

  @ApiProperty({ example: 5, description: 'Defesa base do personagem (máximo 10)', minimum: 0, maximum: 10 })
  @IsInt()
  @Min(0)
  @Max(10)
  defesaBase: number;
}
