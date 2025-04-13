import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemMagico } from '../item-magico/entities/item-magico.entity';

export enum Classe {
  GUERREIRO = 'Guerreiro',
  MAGO = 'Mago',
  ARQUEIRO = 'Arqueiro',
  LADINO = 'Ladino',
  BARDO = 'Bardo',
}

@Entity()
export class Personagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  nomeAventureiro: string;

  @Column({
    type: 'text', 
  })
  classe: Classe;

  @Column()
  level: number;

  @Column()
  forcaBase: number;

  @Column()
  defesaBase: number;

  @OneToMany(() => ItemMagico, item => item.personagem, { cascade: true })
  itensMagicos: ItemMagico[];
}
