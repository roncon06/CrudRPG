import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Personagem } from '../../personagem/personagem.entity';

export enum TipoItem {
  ARMA = 'Arma',
  ARMADURA = 'Armadura',
  AMULETO = 'Amuleto',
}

@Entity()
export class ItemMagico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    type: 'text', 
  })
  tipo: TipoItem;

  @Column()
  forca: number;

  @Column()
  defesa: number;

  @ManyToOne(() => Personagem, personagem => personagem.itensMagicos, {
    onDelete: 'CASCADE',
  })
  personagem: Personagem;
}
